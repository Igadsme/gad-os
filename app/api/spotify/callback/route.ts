import type { NextRequest } from "next/server";

const STATE_COOKIE = "spotify_oauth_state";
const DEFAULT_REDIRECT_URI = "http://127.0.0.1:3000/api/spotify/callback";

type TokenResponse = {
  refresh_token?: string;
  scope?: string;
  error?: string;
  error_description?: string;
};

export const runtime = "nodejs";

function textResponse(message: string, status = 200) {
  return new Response(message, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return textResponse("Spotify setup is only available locally.", 404);
  }

  const url = request.nextUrl;
  const spotifyError = url.searchParams.get("error");
  if (spotifyError) return textResponse(`Spotify authorization failed: ${spotifyError}`, 400);

  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const storedState = request.cookies.get(STATE_COOKIE)?.value;
  if (!code || !returnedState || !storedState || returnedState !== storedState) {
    return textResponse("Spotify authorization failed: invalid or expired state. Start again from /api/spotify/connect.", 400);
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return textResponse("Add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to .env.local, then restart the development server.", 503);
  }

  const redirectUri = process.env.SPOTIFY_REDIRECT_URI ?? DEFAULT_REDIRECT_URI;
  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  });
  const token = (await tokenResponse.json()) as TokenResponse;

  if (!tokenResponse.ok || !token.refresh_token) {
    const reason = token.error_description ?? token.error ?? "Spotify did not return a refresh token";
    return textResponse(`Spotify token exchange failed: ${reason}`, 502);
  }

  const response = textResponse(
    [
      "Spotify connected successfully.",
      "",
      "Copy the refresh token below into Railway as SPOTIFY_REFRESH_TOKEN.",
      "Do not commit, screenshot, or share this token.",
      "",
      token.refresh_token,
      "",
      `Granted scopes: ${token.scope ?? "not reported"}`,
      "",
      "Also add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to the Railway service, then redeploy.",
    ].join("\n"),
  );
  response.headers.append("Set-Cookie", `${STATE_COOKIE}=; Path=/api/spotify; HttpOnly; SameSite=Lax; Max-Age=0`);
  return response;
}
