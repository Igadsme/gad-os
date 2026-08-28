type LanyardResponse = {
  success: boolean;
  data?: {
    discord_status?: string;
    listening_to_spotify?: boolean;
    spotify?: {
      album: string;
      album_art_url: string;
      artist: string;
      song: string;
      timestamps: { start: number; end: number };
      track_id: string;
    } | null;
  };
};

export async function GET() {
  const discordUserId = process.env.DISCORD_USER_ID;
  if (!discordUserId) {
    return Response.json({ available: false, live: false }, { status: 503 });
  }

  try {
    const response = await fetch(
      `https://api.lanyard.rest/v1/users/${discordUserId}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      return Response.json({ available: false, live: false }, { status: 502 });
    }

    const payload = (await response.json()) as LanyardResponse;
    const spotify = payload.data?.spotify;
    const live = Boolean(payload.success && payload.data?.listening_to_spotify && spotify);

    return Response.json({
      available: true,
      live,
      discordStatus: payload.data?.discord_status ?? "offline",
      track: live && spotify
        ? {
            title: spotify.song,
            artist: spotify.artist.replaceAll(";", ","),
            album: spotify.album,
            albumImage: spotify.album_art_url,
            startedAt: spotify.timestamps.start,
            endsAt: spotify.timestamps.end,
            url: `https://open.spotify.com/track/${spotify.track_id}`,
          }
        : null,
    });
  } catch {
    return Response.json({ available: false, live: false }, { status: 502 });
  }
}
