"use client";

import { Pause, SkipBack, SkipForward, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { codingPlaylist, formatDuration } from "@/data/music";

type NowPlaying = {
  title: string;
  artist: string;
  album?: string;
  progressMs: number;
  durationMs: number;
  isPlaying: boolean;
  live: boolean;
  albumImage?: string;
};

export function NowPlayingCard() {
  const [data, setData] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/spotify/now-playing")
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) {
          setData({
            title: codingPlaylist[0].title,
            artist: codingPlaylist[0].artist,
            progressMs: 84000,
            durationMs: codingPlaylist[0].durationMs,
            isPlaying: false,
            live: false,
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) {
    return <Card className="h-40 animate-pulse p-4" />;
  }

  const progress = Math.min(100, (data.progressMs / data.durationMs) * 100);

  return (
    <Card className="p-4">
      <p className="text-sm font-semibold">Now Playing</p>
      <div className="mt-3 flex gap-3">
        <div className="size-14 overflow-hidden rounded-xl bg-gradient-to-br from-violet to-primary" />
        <div className="min-w-0">
          <p className="truncate font-medium">{data.title}</p>
          <p className="truncate text-sm text-muted">{data.artist}</p>
        </div>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-muted">
        <span>{formatDuration(data.progressMs)}</span>
        <span>{formatDuration(data.durationMs)}</span>
      </div>
      <div className="mt-2 flex items-center justify-center gap-4 text-foreground">
        <SkipBack className="size-4" />
        <span className="flex size-8 items-center justify-center rounded-full bg-primary text-white">
          <Pause className="size-4" />
        </span>
        <SkipForward className="size-4" />
      </div>
      <p className="mt-3 flex items-center justify-center gap-1 text-[11px] text-success">
        <Wifi className="size-3" />
        {data.live ? "Live from Spotify" : "Curated coding set · connect Spotify to go live"}
      </p>
    </Card>
  );
}
