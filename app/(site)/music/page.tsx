import { SpotifyPlaylistCard } from "@/components/music/spotify-playlist";
import { NowPlayingCard } from "@/components/music/now-playing";
import { SpotifyInsights } from "@/components/music/spotify-insights";
import { Card } from "@/components/ui/card";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const metadata = { title: "Music", description: "The curated soundtrack behind Imani Gad’s build sessions.", alternates: { canonical: "/music" } };

export default function MusicPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Soundtrack"
        subtitle="The playlist behind long build sessions, late-night debugging, and everything in between."
      />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.55fr)]">
        <SpotifyPlaylistCard />
        <div className="space-y-4">
          <NowPlayingCard />
          <SpotifyInsights />
          <Card className="p-5">
            <p className="font-display text-lg font-semibold">Press play and stay awhile.</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              A hand-picked rotation for focused work, thoughtful breaks, and the occasional late-night sprint.
            </p>
          </Card>
          <Card className="p-5">
            <p className="text-sm font-semibold">No account connection required</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              This official Spotify player works without sharing private listening history or storing account credentials on this site.
            </p>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
