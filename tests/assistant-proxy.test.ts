import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/recruiter/[...path]/route";

const context = {
  params: Promise.resolve({ path: ["api", "chat"] }),
};

beforeEach(() => {
  vi.stubEnv("RECRUITER_ASSISTANT_API_URL", "https://assistant.example");
  vi.stubEnv("NODE_ENV", "test");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("recruiter assistant proxy", () => {
  it("forwards supported API requests server-side without browser credentials", async () => {
    const upstream = vi.fn().mockResolvedValue(
      Response.json({ message: "Grounded reply", sources: [] }),
    );
    vi.stubGlobal("fetch", upstream);

    const request = new Request(
      "https://portfolio.example/api/recruiter/api/chat?mode=recruiter",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "browser-secret",
          cookie: "browser-session",
        },
        body: JSON.stringify({ message: "What experience does Imani have?" }),
      },
    );
    const response = await POST(request, context);
    const init = upstream.mock.calls[0][1] as RequestInit;
    const headers = new Headers(init.headers);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ message: "Grounded reply" });
    expect(String(upstream.mock.calls[0][0])).toBe(
      "https://assistant.example/api/chat?mode=recruiter",
    );
    expect(headers.get("authorization")).toBeNull();
    expect(headers.get("cookie")).toBeNull();
  });

  it("returns a clear unavailable response when the backend is not configured", async () => {
    vi.stubEnv("RECRUITER_ASSISTANT_API_URL", "");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const response = await POST(
      new Request("https://portfolio.example/api/recruiter/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      }),
      context,
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      error: { code: "assistant_unavailable" },
    });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects paths outside the assistant API allowlist", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const response = await POST(
      new Request("https://portfolio.example/api/recruiter/api/admin/secrets", {
        method: "POST",
        body: "{}",
      }),
      { params: Promise.resolve({ path: ["api", "admin", "secrets"] }) },
    );

    expect(response.status).toBe(404);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects request bodies larger than 64 KB", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const response = await POST(
      new Request("https://portfolio.example/api/recruiter/api/chat", {
        method: "POST",
        body: "x".repeat(64 * 1024 + 1),
      }),
      context,
    );

    expect(response.status).toBe(413);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("refuses insecure assistant origins in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("RECRUITER_ASSISTANT_API_URL", "http://assistant.example");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const response = await POST(
      new Request("https://portfolio.example/api/recruiter/api/chat", {
        method: "POST",
        body: "{}",
      }),
      context,
    );

    expect(response.status).toBe(503);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
