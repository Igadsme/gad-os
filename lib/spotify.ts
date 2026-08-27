import { codingPlaylist, curatedRecentlyPlayed, curatedTopArtists } from "@/data/music";

type SpotifyTrack = {
  title: string;
  artist: string;
  album?: string;
  progressMs: number;
  durationMs: number;
  isPlaying: boolean;
  live: boolean;
  connected: boolean;
  albumImage?: string;
};

async function getAccessToken() {
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN;
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!refresh || !id || !secret) return null;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh,
    }),
    cache: "no-store",
  });
  if (!response.ok) return null;
  const json = await response.json();
  return json.access_token as string;
}

function curatedNowPlaying(): SpotifyTrack {
  const fallback = codingPlaylist[0];
  return {
    title: fallback.title,
    artist: fallback.artist,
    album: fallback.album,
    progressMs: 84000,
    durationMs: fallback.durationMs,
    isPlaying: false,
    live: false,
    connected: false,
  };
}

export async function getNowPlaying(): Promise<SpotifyTrack> {
  const token = await getAccessToken();
  if (!token) return curatedNowPlaying();

  const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (response.status === 429) {
    return { ...curatedNowPlaying(), connected: true };
  }
  if (response.status === 204 || !response.ok) {
    return { ...curatedNowPlaying(), connected: true };
  }
  const data = await response.json();
  const item = data.item;
  return {
    title: item?.name ?? "Unknown",
    artist: (item?.artists ?? []).map((artist: { name: string }) => artist.name).join(", "),
    album: item?.album?.name,
    progressMs: data.progress_ms ?? 0,
    durationMs: item?.duration_ms ?? 0,
    isPlaying: Boolean(data.is_playing),
    live: true,
    connected: true,
    albumImage: item?.album?.images?.[0]?.url,
  };
}

export async function getRecentlyPlayed() {
  const token = await getAccessToken();
  if (!token) {
    return { live: false, tracks: curatedRecentlyPlayed };
  }
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=4",
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" },
  );
  if (response.status === 429) {
    return { live: false, rateLimited: true, tracks: curatedRecentlyPlayed };
  }
  if (!response.ok) {
    return { live: false, unavailable: true, tracks: curatedRecentlyPlayed };
  }
  const data = await response.json();
  return {
    live: true,
    tracks: (data.items ?? []).map((item: { track: { name: string; artists: { name: string }[] } }) => ({
      title: item.track.name,
      artist: item.track.artists.map((artist) => artist.name).join(", "),
    })),
  };
}

export async function getTopArtists() {
  const token = await getAccessToken();
  if (!token) {
    return { live: false, artists: [...curatedTopArtists] };
  }
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?limit=5&time_range=short_term",
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" },
  );
  if (response.status === 429) {
    return { live: false, rateLimited: true, artists: [...curatedTopArtists] };
  }
  if (!response.ok) {
    return { live: false, unavailable: true, artists: [...curatedTopArtists] };
  }
  const data = await response.json();
  return {
    live: true,
    artists: (data.items ?? []).map((artist: { name: string }) => ({
      name: artist.name,
    })),
  };
}
