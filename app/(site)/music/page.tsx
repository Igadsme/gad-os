import { NowPlayingCard } from "@/components/music/now-playing";
import { SpotifyInsights } from "@/components/music/spotify-insights";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const metadata = { title: "Music", description: "The live soundtrack behind Imani Gad’s build sessions.", alternates: { canonical: "/music" } };

export default function MusicPage() {
  return (
    <PageContainer width="narrow">
      <PageHeader title="Soundtrack" />
      <div className="space-y-4">
        <NowPlayingCard />
        <SpotifyInsights />
      </div>
    </PageContainer>
  );
}
