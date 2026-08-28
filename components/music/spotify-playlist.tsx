import { ExternalLink, Music2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const playlistId = "5ojW8FunKaUXTc6I0Md4bT";
const playlistUrl = `https://open.spotify.com/playlist/${playlistId}`;
const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;

export function SpotifyPlaylistCard({ compact = false }: { compact?: boolean }) {
  return (
    <Card className={cn("overflow-hidden", compact ? "p-3" : "p-4")}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#1ed760] text-black">
            <Music2 className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">midnight.exe</p>
            <p className="text-[11px] text-muted">Playable on Spotify</p>
          </div>
        </div>
        <span className="shrink-0 text-[11px] font-medium text-[#16883f]">Spotify</span>
      </div>

      <iframe
        title="Imani's Spotify playlist"
        src={embedUrl}
        width="100%"
        height={compact ? 152 : 352}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className={cn("block w-full border-0", compact ? "h-[152px] rounded-xl" : "h-[352px] rounded-2xl")}
      />

      <a
        href={playlistUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        Open in Spotify
        <ExternalLink className="size-3.5" />
      </a>
    </Card>
  );
}
