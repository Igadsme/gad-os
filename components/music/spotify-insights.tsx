"use client";

import { ExternalLink, Music2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { codingPlaylist, codingPlaylistDuration, curatedRecentlyPlayed, curatedTopArtists, formatDuration } from "@/data/music";

type Artist = { name: string; context?: string; image?: string; genres?: string[]; url?: string };
type Track = { title: string; artist: string; album?: string; durationMs?: number; albumImage?: string; url?: string };

const albumGradients = [
  "from-fuchsia-500 via-violet-600 to-blue-900",
  "from-slate-400 via-stone-600 to-slate-950",
  "from-sky-900 via-slate-800 to-amber-900",
  "from-orange-300 via-rose-400 to-sky-500",
];
const waveform = [12, 27, 18, 42, 31, 52, 20, 36, 58, 28, 44, 19, 32, 50, 23, 39, 61, 34, 22, 47, 30, 56, 38, 17, 43, 26, 51, 35, 59, 29, 46, 21, 40, 54, 25, 37, 49, 16, 33, 57, 24, 45, 30, 53, 20, 41, 28, 48];

function TrackArtwork({ track, index }: { track: Track; index: number }) {
  if (track.albumImage) {
    return (
      // Spotify artwork is returned from a changing CDN hostname.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={track.albumImage} alt={`${track.album ?? track.title} cover`} className="aspect-square w-full rounded-xl object-cover" />
    );
  }
  return (
    <div className={`flex aspect-square w-full items-end justify-end rounded-xl bg-gradient-to-br ${albumGradients[index % albumGradients.length]} p-3`} role="img" aria-label="Abstract album artwork">
      <Music2 className="size-6 text-white/80" />
    </div>
  );
}

export function SpotifyInsights() {
  const [artists, setArtists] = useState<Artist[] | null>(null);
  const [tracks, setTracks] = useState<Track[] | null>(null);
  const [live, setLive] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/spotify/top-artists").then((res) => res.json()),
      fetch("/api/spotify/recent").then((res) => res.json()),
    ])
      .then(([artistJson, trackJson]) => {
        const liveArtists = artistJson.artists ?? [];
        const liveTracks = trackJson.tracks ?? [];
        const isLive = Boolean(artistJson.live || trackJson.live);
        setLive(isLive && liveArtists.length + liveTracks.length > 0);
        setArtists(liveArtists.length > 0 ? liveArtists : [...curatedTopArtists]);
        setTracks(liveTracks.length > 0 ? liveTracks : curatedRecentlyPlayed);
        if (artistJson.rateLimited || trackJson.rateLimited) setNotice("Spotify is rate-limited, so curated selections are shown.");
        else if (artistJson.unavailable || trackJson.unavailable) setNotice("Live listening data is temporarily unavailable.");
      })
      .catch(() => {
        setArtists([...curatedTopArtists]);
        setTracks(curatedRecentlyPlayed);
        setNotice("Live listening data is temporarily unavailable.");
      });
  }, []);

  if (!artists || !tracks) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-60" />
        <div className="grid gap-4 md:grid-cols-2"><Skeleton className="h-80" /><Skeleton className="h-80" /></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold">Recently Played</h2>
          <span className="text-[11px] text-primary">{live ? "From Spotify" : "Curated selection"}</span>
        </div>
        {notice ? <p className="mt-2 text-xs text-muted">{notice}</p> : null}
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {tracks.slice(0, 4).map((track, index) => {
            const content = <><TrackArtwork track={track} index={index} /><p className="mt-2 truncate text-xs font-semibold">{track.title}</p><p className="mt-0.5 truncate text-[11px] text-muted">{track.artist}</p></>;
            return track.url ? (
              <a key={`${track.title}-${track.artist}`} href={track.url} target="_blank" rel="noreferrer" className="group min-w-0 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary">{content}</a>
            ) : <div key={`${track.title}-${track.artist}`} className="min-w-0">{content}</div>;
          })}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="flex min-h-[360px] flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Top Artists</h2><span className="text-[11px] text-primary">Last 4 weeks</span></div>
          <ol className="mt-4 flex-1 space-y-3">
            {artists.slice(0, 5).map((artist, index) => {
              const detail = artist.genres?.[0] ?? artist.context ?? `Top artist #${index + 1}`;
              return (
                <li key={artist.name} className="flex items-center gap-3">
                  {artist.image ? (
                    // Spotify artwork is returned from a changing CDN hostname.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={artist.image} alt="" className="size-10 rounded-full object-cover" />
                  ) : <span className={`flex size-10 items-center justify-center rounded-full bg-gradient-to-br ${albumGradients[index % albumGradients.length]} text-xs font-semibold text-white`}>{artist.name.slice(0, 1)}</span>}
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{artist.name}</p><p className="truncate text-[11px] capitalize text-muted">{detail}</p></div>
                  {artist.url ? <a href={artist.url} target="_blank" rel="noreferrer" className="inline-flex size-10 items-center justify-center text-muted hover:text-primary" aria-label={`Open ${artist.name} in Spotify`}><ExternalLink className="size-3.5" /></a> : <span className="text-xs tabular-nums text-muted">#{index + 1}</span>}
                </li>
              );
            })}
          </ol>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs"><span className="text-primary">Listening profile</span><span className="text-muted">{live ? "Spotify" : "Curated"}</span></div>
        </Card>

        <Card className="flex min-h-[360px] flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Coding Playlist</h2><a href="https://open.spotify.com/playlist/5ojW8FunKaUXTc6I0Md4bT" target="_blank" rel="noreferrer" className="text-[11px] text-primary hover:underline">View playlist</a></div>
          <div className="mt-5 flex h-16 items-center gap-px overflow-hidden" aria-label="Audio waveform visualization">
            {waveform.map((height, index) => <span key={index} className="min-w-px flex-1 rounded-full bg-primary/80" style={{ height: `${height}%` }} />)}
          </div>
          <ol className="mt-4 flex-1 divide-y divide-border">
            {codingPlaylist.map((track) => (
              <li key={track.title} className="flex items-center justify-between gap-3 py-2.5 first:pt-0"><div className="min-w-0"><p className="truncate text-xs font-medium">{track.title}</p><p className="truncate text-[11px] text-muted">{track.artist}</p></div><span className="text-[11px] tabular-nums text-muted">{formatDuration(track.durationMs)}</span></li>
            ))}
          </ol>
          <div className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-xs text-primary"><span>{codingPlaylist.length} tracks</span><span aria-hidden>·</span><span>{formatDuration(codingPlaylistDuration)}</span></div>
        </Card>
      </div>
    </div>
  );
}
