"use client";

import Link from "next/link";
import { ExternalLink, Headphones, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Presence = {
  available: boolean;
  live: boolean;
  track?: {
    title: string;
    artist: string;
    album: string;
    albumImage: string;
    startedAt: number;
    endsAt: number;
    url: string;
  } | null;
};

function formatTime(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
}

export function LiveListeningCard({ compact = false }: { compact?: boolean }) {
  const [presence, setPresence] = useState<Presence | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetch("/api/discord/presence")
        .then((response) => response.json())
        .then((data: Presence) => {
          if (!cancelled) setPresence(data);
        })
        .catch(() => {
          if (!cancelled) setPresence({ available: false, live: false });
        });
    };

    load();
    const presenceTimer = window.setInterval(load, 15_000);
    const progressTimer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => {
      cancelled = true;
      window.clearInterval(presenceTimer);
      window.clearInterval(progressTimer);
    };
  }, []);

  if (!presence) {
    return (
      <Card className={cn(compact ? "p-3" : "p-5")}>
        <Skeleton className="h-4 w-32" />
        <div className="mt-4 flex gap-3">
          <Skeleton className="size-20 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2 pt-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      </Card>
    );
  }

  const track = presence.track;
  if (!presence.live || !track) {
    return (
      <Card className={cn(compact ? "p-3" : "p-5")}>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">Now Playing</p>
          <span className="text-[11px] text-muted">Offline</span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-surface-muted text-muted">
            <Headphones className="size-5" />
          </span>
          <div>
            <p className="text-sm font-medium">Nothing playing right now</p>
            <p className="mt-1 text-xs text-muted">The live card updates automatically.</p>
          </div>
        </div>
        <Link href="/music" className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline">
          Play midnight.exe
        </Link>
      </Card>
    );
  }

  const duration = Math.max(1, track.endsAt - track.startedAt);
  const elapsed = Math.min(duration, Math.max(0, now - track.startedAt));
  const progress = (elapsed / duration) * 100;

  return (
    <Card className={cn("overflow-hidden", compact ? "p-3" : "p-5")}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">Now Playing</p>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#16883f]">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#1ed760] opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-[#1ed760]" />
          </span>
          Live
        </span>
      </div>
      <div className={cn("mt-3 flex", compact ? "gap-3" : "gap-4")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={track.albumImage}
          alt={`${track.album} album artwork`}
          className={cn("shrink-0 rounded-xl object-cover shadow-sm", compact ? "size-[72px]" : "size-24")}
        />
        <div className="min-w-0 flex-1 self-center">
          <p className={cn("truncate font-display font-semibold", compact ? "text-base" : "text-xl")}>
            {track.title}
          </p>
          <p className="mt-0.5 truncate text-sm text-muted">{track.artist}</p>
          <p className="mt-0.5 truncate text-xs text-muted">{track.album}</p>
        </div>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-muted">
        <div className="h-full rounded-full bg-[#1ed760] transition-[width] duration-1000" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-muted">
        <span>{formatTime(elapsed)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <a
        href={track.url}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <Radio className="size-3.5" />
        Listen on Spotify
        <ExternalLink className="size-3.5" />
      </a>
    </Card>
  );
}
