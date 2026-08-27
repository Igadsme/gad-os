import { NowPlayingCard } from "@/components/music/now-playing";
import { SpotifyInsights } from "@/components/music/spotify-insights";
import { Card } from "@/components/ui/card";
import { PageContainer, PageHeader } from "@/components/layout/page-header";
import {
  codingPlaylist,
  codingPlaylistDuration,
  formatDuration,
} from "@/data/music";

export const metadata = { title: "Music" };

export default function MusicPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Soundtrack"
        subtitle="Focus music for building. Live Spotify when connected; otherwise a labeled curated playlist."
      />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <NowPlayingCard />
        <Card className="p-4">
          <p className="text-sm font-semibold">Listening summary</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            {codingPlaylist.length} tracks · {formatDuration(codingPlaylistDuration)} ·
            curated focus set used when Spotify is not connected.
          </p>
          <p className="mt-3 text-xs text-muted">
            Connect Spotify to show live listening activity.
          </p>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Coding Playlist</h2>
            <span className="text-[11px] text-muted">Curated playlist</span>
          </div>
          <div className="mb-3 flex h-14 items-end gap-1 overflow-hidden rounded-xl bg-gradient-to-r from-primary/70 via-violet to-primary/40 px-3 py-2">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((bar) => (
              <span
                key={bar}
                className="eq-bar w-1.5 rounded-sm bg-white/85"
                style={{ animationDelay: `${bar * 90}ms`, height: "70%" }}
              />
            ))}
          </div>
          <ul className="space-y-2.5">
            {codingPlaylist.map((track) => (
              <li key={track.title} className="flex items-center justify-between text-sm">
                <span>
                  <span className="block font-medium">{track.title}</span>
                  <span className="text-xs text-muted">{track.artist}</span>
                </span>
                <span className="text-xs text-muted">{formatDuration(track.durationMs)}</span>
              </li>
            ))}
          </ul>
        </Card>
        <SpotifyInsights />
      </div>
    </PageContainer>
  );
}
