import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

const STATE_COOKIE = "spotify_oauth_state";
const DEFAULT_REDIRECT_URI = "http://127.0.0.1:3000/api/spotify/callback";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
];

export const runtime = "nodejs";

export function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Spotify setup is only available locally." }, { status: 404 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "Add SPOTIFY_CLIENT_ID to .env.local, then restart the development server." },
      { status: 503 },
    );
  }

  const state = randomBytes(24).toString("hex");
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI ?? DEFAULT_REDIRECT_URI;
  const authorizationUrl = new URL("https://accounts.spotify.com/authorize");
  authorizationUrl.search = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: SCOPES.join(" "),
    state,
    show_dialog: "true",
  }).toString();

  const response = NextResponse.redirect(authorizationUrl);
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/api/spotify",
    maxAge: 10 * 60,
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
