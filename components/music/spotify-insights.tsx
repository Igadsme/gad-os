"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

type Artist = { name: string };
type Track = { title: string; artist: string };

export function SpotifyInsights() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    fetch("/api/spotify/top-artists")
      .then((res) => res.json())
      .then((json) => setArtists(json.artists ?? []))
      .catch(() => setArtists([]));
    fetch("/api/spotify/recent")
      .then((res) => res.json())
      .then((json) => setTracks(json.tracks ?? []))
      .catch(() => setTracks([]));
  }, []);

  return (
    <Card className="p-5">
      <h2 className="font-semibold">Listening</h2>
      {artists.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {artists.map((artist) => (
            <li key={artist.name} className="text-sm">
              {artist.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-muted">
          Connect Spotify with `SPOTIFY_REFRESH_TOKEN` to show top artists and
          recently played tracks.
        </p>
      )}
      {tracks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold">Recently played</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {tracks.map((track) => (
              <li key={`${track.title}-${track.artist}`}>
                {track.title} · {track.artist}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
