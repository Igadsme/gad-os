"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  curatedRecentlyPlayed,
  curatedTopArtists,
  formatDuration,
} from "@/data/music";

type Artist = { name: string; context?: string };
type Track = { title: string; artist: string; durationMs?: number };

export function SpotifyInsights() {
  const [artists, setArtists] = useState<Artist[] | null>(null);
  const [tracks, setTracks] = useState<Track[] | null>(null);
  const [live, setLive] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/spotify/top-artists").then((res) => res.json()),
      fetch("/api/spotify/recent").then((res) => res.json()),
    ])
      .then(([artistJson, trackJson]) => {
        setRateLimited(Boolean(artistJson.rateLimited || trackJson.rateLimited));
        setUnavailable(Boolean(artistJson.unavailable || trackJson.unavailable));
        const liveArtists = artistJson.artists ?? [];
        const liveTracks = trackJson.tracks ?? [];
        const isLive = Boolean(artistJson.live || trackJson.live);
        setLive(isLive && liveArtists.length + liveTracks.length > 0);
        setArtists(liveArtists.length > 0 ? liveArtists : [...curatedTopArtists]);
        setTracks(liveTracks.length > 0 ? liveTracks : curatedRecentlyPlayed);
      })
      .catch(() => {
        setArtists([...curatedTopArtists]);
        setTracks(curatedRecentlyPlayed);
        setUnavailable(true);
      });
  }, []);

  if (!artists || !tracks) {
    return (
      <div className="grid gap-4">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Top Artists</h2>
          <span className="text-[11px] text-muted">
            {live ? "From Spotify" : "Curated playlist"}
          </span>
        </div>
        {rateLimited ? (
          <p className="mt-2 text-xs text-muted">Spotify is rate-limited. Showing fallback.</p>
        ) : null}
        {unavailable && live === false ? (
          <p className="mt-2 text-xs text-muted">Live listening is unavailable right now.</p>
        ) : null}
        <ul className="mt-3 space-y-2.5">
          {artists.map((artist) => (
            <li key={artist.name} className="flex items-center justify-between text-sm">
              <span className="font-medium">{artist.name}</span>
              {artist.context ? (
                <span className="text-xs text-muted">{artist.context}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </Card>
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Recently Played</h2>
          <span className="text-[11px] text-muted">
            {live ? "From Spotify" : "Curated playlist"}
          </span>
        </div>
        <ul className="mt-3 space-y-2.5">
          {tracks.map((track) => (
            <li key={`${track.title}-${track.artist}`} className="flex items-center justify-between text-sm">
              <span>
                <span className="block font-medium">{track.title}</span>
                <span className="text-xs text-muted">{track.artist}</span>
              </span>
              {track.durationMs ? (
                <span className="text-xs text-muted">{formatDuration(track.durationMs)}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
