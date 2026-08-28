"use client";

import Link from "next/link";
import { ExternalLink, Music2, Pause, Play, Repeat2, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { codingPlaylist, formatDuration } from "@/data/music";
import { Skeleton } from "@/components/ui/skeleton";

type NowPlaying = {
  title: string;
  artist: string;
  album?: string;
  progressMs: number;
  durationMs: number;
  isPlaying: boolean;
  live: boolean;
  connected?: boolean;
  albumImage?: string;
  url?: string;
};

const fallbackTrack: NowPlaying = {
  ...codingPlaylist[0],
  progressMs: 84000,
  isPlaying: false,
  live: false,
  connected: false,
};

function AlbumArtwork({ track, compact = false }: { track: NowPlaying; compact?: boolean }) {
  const size = compact ? "size-14 rounded-xl" : "aspect-square w-full rounded-2xl";
  if (track.albumImage) {
    return (
      // Spotify artwork is returned from a changing CDN hostname.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={track.albumImage} alt={`${track.album ?? track.title} cover`} className={`${size} object-cover shadow-sm`} />
    );
  }
  return (
    <div className={`${size} relative overflow-hidden bg-[radial-gradient(circle_at_28%_22%,#ef63c3_0,transparent_30%),radial-gradient(circle_at_72%_68%,#2f75ff_0,transparent_34%),linear-gradient(145deg,#6d28d9,#10245f_55%,#07121f)]`} aria-label="Abstract album artwork" role="img">
      <div className="absolute inset-[18%] rotate-12 rounded-[38%] border border-white/25 bg-white/10 backdrop-blur-sm" />
      <Music2 className="absolute bottom-[12%] right-[12%] size-[28%] text-white/85" />
    </div>
  );
}

export function NowPlayingCard({ compact = false }: { compact?: boolean }) {
  const [data, setData] = useState<NowPlaying | null>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetch("/api/spotify/now-playing")
        .then((res) => res.json())
        .then((json) => {
          if (!cancelled) {
            setData(json);
            setElapsed(0);
          }
        })
        .catch(() => {
          if (!cancelled) setData(fallbackTrack);
        });
    };
    load();
    const refreshTimer = window.setInterval(load, 15_000);
    return () => {
      cancelled = true;
      window.clearInterval(refreshTimer);
    };
  }, []);

  useEffect(() => {
    if (!data?.live || !data.isPlaying) return;
    const progressTimer = window.setInterval(() => setElapsed((value) => value + 1000), 1000);
    return () => window.clearInterval(progressTimer);
  }, [data]);

  const track = data ?? fallbackTrack;
  const progressMs = Math.min(track.durationMs, track.progressMs + elapsed);
  const progress = track.durationMs > 0 ? Math.min(100, (progressMs / track.durationMs) * 100) : 0;
  const statusLabel = track.live ? "Connected to Spotify" : track.connected ? "Spotify connected · Start a song to update" : "Curated listening preview";
  const controlTitle = "Playback controls are available in Spotify";

  if (!data) {
    return (
      <Card className={compact ? "h-40 p-4" : "p-5 sm:p-6"}>
        <Skeleton className="h-4 w-24" />
        <div className="mt-4 flex gap-4">
          <Skeleton className={compact ? "size-14" : "size-44"} />
          <div className="flex-1 space-y-3 pt-2"><Skeleton className="h-7 w-3/4" /><Skeleton className="h-4 w-1/2" /><Skeleton className="mt-8 h-1.5 w-full rounded-full" /></div>
        </div>
      </Card>
    );
  }

  if (compact) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold">Now Playing</p><span className="truncate text-[11px] text-muted">{track.live ? "Live" : "Offline"}</span></div>
        <div className="mt-3 flex gap-3"><AlbumArtwork track={track} compact /><div className="min-w-0 pt-1"><p className="truncate text-sm font-medium">{track.title}</p><p className="truncate text-xs text-muted">{track.artist}</p></div></div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} /></div>
        <Link href="/music" className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-primary">Open Music</Link>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-5 sm:p-6">
      <p className="text-sm font-semibold">Now Playing</p>
      <div className="mt-4 grid gap-6 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
        <AlbumArtwork track={track} />
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="truncate font-display text-3xl font-bold tracking-[-0.035em] sm:text-4xl">{track.title}</h2>
              <p className="mt-1 truncate text-lg text-muted">{track.artist}</p>
              {track.album ? <p className="mt-1 truncate text-xs text-muted">{track.album}</p> : null}
            </div>
            {track.url ? <a href={track.url} target="_blank" rel="noreferrer" className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary" aria-label="Open current track in Spotify"><ExternalLink className="size-4" /></a> : null}
          </div>
          <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-surface-muted"><div className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-linear" style={{ width: `${progress}%` }} /></div>
          <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-muted"><span>{formatDuration(progressMs)}</span><span>{formatDuration(track.durationMs)}</span></div>
          <div className="mt-4 flex items-center justify-center gap-2 sm:gap-4">
            <button type="button" disabled title={controlTitle} className="inline-flex size-10 items-center justify-center text-muted disabled:cursor-not-allowed" aria-label="Shuffle in Spotify"><Shuffle className="size-4" /></button>
            <button type="button" disabled title={controlTitle} className="inline-flex size-10 items-center justify-center text-foreground disabled:cursor-not-allowed" aria-label="Previous track in Spotify"><SkipBack className="size-5" /></button>
            {track.url ? <a href={track.url} target="_blank" rel="noreferrer" title="Open playback in Spotify" className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-white shadow-sm" aria-label="Open playback in Spotify">{track.isPlaying ? <Pause className="size-5" fill="currentColor" /> : <Play className="size-5 translate-x-px" fill="currentColor" />}</a> : <button type="button" disabled title={controlTitle} className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-white disabled:cursor-not-allowed" aria-label="Play in Spotify"><Play className="size-5 translate-x-px" fill="currentColor" /></button>}
            <button type="button" disabled title={controlTitle} className="inline-flex size-10 items-center justify-center text-foreground disabled:cursor-not-allowed" aria-label="Next track in Spotify"><SkipForward className="size-5" /></button>
            <button type="button" disabled title={controlTitle} className="inline-flex size-10 items-center justify-center text-muted disabled:cursor-not-allowed" aria-label="Repeat in Spotify"><Repeat2 className="size-4" /></button>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted"><span className={`size-2 rounded-full ${track.connected ? "bg-[#1DB954]" : "bg-muted"}`} />{statusLabel}</div>
    </Card>
  );
}
