import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 64 * 1024;
const UPSTREAM_TIMEOUT_MS = 55_000;
const allowedPath =
  /^\/api\/(?:chat|conversations(?:\/[0-9a-f-]{36}(?:\/session)?)?|candidate\/(?:profile|experience|projects(?:\/[A-Za-z0-9:_-]+)?|skills|brief|timeline|sources(?:\/[A-Za-z0-9:_-]+)?)|fit|interview(?:\/tracks)?|analytics(?:\/events)?)$/i;

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

function errorResponse(status: number, code: string, message: string) {
  return NextResponse.json({ error: { code, message } }, { status });
}

async function readLimitedBody(request: Request): Promise<ArrayBuffer | null> {
  if (!request.body) return new ArrayBuffer(0);

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body.buffer;
}

async function proxyAssistantRequest(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const requestPath = `/${path.join("/")}`;

  if (!allowedPath.test(requestPath)) {
    return errorResponse(404, "not_found", "Assistant API route not found.");
  }

  const configuredUrl = process.env.RECRUITER_ASSISTANT_API_URL;
  if (!configuredUrl) {
    return errorResponse(
      503,
      "assistant_unavailable",
      "The recruiter assistant backend is not configured.",
    );
  }

  let backendUrl: URL;
  try {
    backendUrl = new URL(configuredUrl);
  } catch {
    return errorResponse(503, "assistant_unavailable", "The assistant backend URL is invalid.");
  }

  const production = process.env.NODE_ENV === "production";
  const localHost = ["localhost", "127.0.0.1", "::1"].includes(backendUrl.hostname);
  if (
    backendUrl.username ||
    backendUrl.password ||
    backendUrl.search ||
    backendUrl.hash ||
    backendUrl.pathname !== "/" ||
    (production && (backendUrl.protocol !== "https:" || localHost)) ||
    (!production && !["http:", "https:"].includes(backendUrl.protocol))
  ) {
    return errorResponse(
      503,
      "assistant_unavailable",
      "The assistant backend URL is not a valid service origin.",
    );
  }

  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(`${requestPath}${incomingUrl.search}`, backendUrl);
  const headers = new Headers({
    accept: request.headers.get("accept") ?? "application/json",
  });
  const contentType = request.headers.get("content-type");
  const analyticsKey = request.headers.get("x-analytics-key");
  if (contentType) headers.set("content-type", contentType);
  if (analyticsKey) headers.set("x-analytics-key", analyticsKey);

  const init: RequestInit = {
    method: request.method,
    headers,
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    let body: ArrayBuffer | null;
    try {
      body = await readLimitedBody(request);
    } catch (error) {
      const detail = error instanceof Error ? error.name : "UnknownError";
      console.error(`[assistant proxy] request body read failed (${detail})`);
      return errorResponse(400, "invalid_request_body", "Assistant request body could not be read.");
    }
    if (body === null) {
      return errorResponse(413, "payload_too_large", "Assistant request is too large.");
    }
    init.body = body;
  }

  try {
    const upstream = await fetch(upstreamUrl, init);
    const responseHeaders = new Headers({
      "cache-control": "no-store",
      "content-type": upstream.headers.get("content-type") ?? "application/json",
    });
    const retryAfter = upstream.headers.get("retry-after");
    if (retryAfter) responseHeaders.set("retry-after", retryAfter);
    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (error) {
    const detail = error instanceof Error ? error.name : "UnknownError";
    console.error(`[assistant proxy] upstream request failed (${detail})`);
    return errorResponse(
      502,
      "assistant_unavailable",
      "The assistant backend could not be reached. Please try again shortly.",
    );
  }
}

export async function GET(request: Request, context: RouteContext) {
  return proxyAssistantRequest(request, context);
}

export async function POST(request: Request, context: RouteContext) {
  return proxyAssistantRequest(request, context);
}

export async function PATCH(request: Request, context: RouteContext) {
  return proxyAssistantRequest(request, context);
}
