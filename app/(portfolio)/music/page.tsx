import { NowPlayingCard } from "@/components/music/now-playing";
import { SpotifyInsights } from "@/components/music/spotify-insights";
import { Card } from "@/components/ui/card";
import {
  codingPlaylist,
  codingPlaylistDuration,
  formatDuration,
} from "@/data/music";

export const metadata = { title: "Music" };

export default function MusicPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="serif-title text-4xl">Soundtrack</h1>
      <NowPlayingCard />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Coding playlist</h2>
            <span className="text-xs text-muted">
              {codingPlaylist.length} tracks · {formatDuration(codingPlaylistDuration)}
            </span>
          </div>
          <div className="mb-4 h-16 rounded-xl bg-gradient-to-r from-primary/70 via-violet to-primary/40" />
          <ul className="space-y-3">
            {codingPlaylist.map((track) => (
              <li key={track.title} className="flex items-center justify-between text-sm">
                <span>
                  <span className="block font-medium">{track.title}</span>
                  <span className="text-muted">{track.artist}</span>
                </span>
                <span className="text-muted">{formatDuration(track.durationMs)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">
            Static focus set used when Spotify is not connected. Live now-playing,
            recently played, and top artists appear when credentials are set.
          </p>
        </Card>
        <SpotifyInsights />
      </div>
    </div>
  );
}
