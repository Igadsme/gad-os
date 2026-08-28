"use client";

import Link from "next/link";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { codingPlaylist, formatDuration } from "@/data/music";
import { Tooltip } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

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
};

export function NowPlayingCard({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [data, setData] = useState<NowPlaying | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetch("/api/spotify/now-playing")
        .then((res) => res.json())
        .then((json) => {
          if (!cancelled) {
            setData(json);
            setPlaying(Boolean(json.isPlaying));
          }
        })
        .catch(() => {
          if (!cancelled) {
            setData({
              title: codingPlaylist[0].title,
              artist: codingPlaylist[0].artist,
              album: codingPlaylist[0].album,
              progressMs: 84000,
              durationMs: codingPlaylist[0].durationMs,
              isPlaying: false,
              live: false,
            });
          }
        });
    };
    load();
    const timer = window.setInterval(load, 15_000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  if (!data) {
    return (
      <Card className="h-40 p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="mt-4 flex gap-3">
          <Skeleton className="size-14 shrink-0" />
          <div className="flex-1 space-y-2 pt-1">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="mt-4 h-1.5 w-full rounded-full" />
      </Card>
    );
  }

  const track = data.live
    ? data
    : {
        ...data,
        title: codingPlaylist[index].title,
        artist: codingPlaylist[index].artist,
        album: codingPlaylist[index].album,
        durationMs: codingPlaylist[index].durationMs,
      };

  const live = Boolean(data.live);
  const connected = Boolean(data.connected);
  const statusLabel = live
    ? "Live from Spotify"
    : connected
      ? "Spotify connected"
      : "Curated playlist";
  const progressMs = live ? data.progressMs : Math.min(data.progressMs, track.durationMs);
  const progress =
    track.durationMs > 0 ? Math.min(100, (progressMs / track.durationMs) * 100) : 0;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Now Playing</p>
        <span className="text-[11px] text-muted">
          {statusLabel}
        </span>
      </div>
      <div className="mt-3 flex gap-3">
        {track.albumImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={track.albumImage}
            alt=""
            className="size-14 rounded-xl object-cover"
          />
        ) : (
          <div
            className="flex size-14 items-end justify-center gap-0.5 overflow-hidden rounded-xl bg-gradient-to-br from-violet to-primary p-2"
            aria-hidden
          >
            {[0, 1, 2, 3].map((bar) => (
              <span
                key={bar}
                className={cn("eq-bar w-1 rounded-sm bg-white/90", playing ? "h-full" : "h-2")}
                style={{ animationDelay: `${bar * 120}ms` }}
              />
            ))}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{track.title}</p>
          <p className="truncate text-xs text-muted">{track.artist}</p>
          {track.album ? (
            <p className="truncate text-[11px] text-muted">{track.album}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-muted">
        <span>{formatDuration(progressMs)}</span>
        <span>{formatDuration(track.durationMs)}</span>
      </div>
      <div className="mt-1 flex items-center justify-center gap-1">
        <Tooltip label="Preview only — does not control Spotify">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-foreground"
            aria-label="Previous track"
            onClick={() =>
              setIndex((current) => (current - 1 + codingPlaylist.length) % codingPlaylist.length)
            }
          >
            <SkipBack className="size-4" />
          </button>
        </Tooltip>
        <Tooltip label="Preview only — does not control Spotify">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-white"
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((current) => !current)}
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
        </Tooltip>
        <Tooltip label="Preview only — does not control Spotify">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-foreground"
            aria-label="Next track"
            onClick={() => setIndex((current) => (current + 1) % codingPlaylist.length)}
          >
            <SkipForward className="size-4" />
          </button>
        </Tooltip>
      </div>
      {!compact ? (
        <p className="mt-1 text-center text-[11px] text-muted">
          {live
            ? "Connected to Spotify"
            : connected
              ? "Spotify is connected. Start a track to update this card."
              : "The curated playlist appears when Spotify is unavailable."}
        </p>
      ) : (
        <Link
          href="/music"
          className="mt-2 inline-flex min-h-11 items-center text-sm text-primary"
        >
          Open Music
        </Link>
      )}
    </Card>
  );
}
