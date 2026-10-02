import { AnalyticsDashboard } from "@/components/assistant/native/components/AnalyticsDashboard";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const metadata = {
  title: "Recruiter Analytics",
  robots: { index: false, follow: false },
};

export default function AssistantAnalyticsPage() {
  return (
    <PageContainer width="wide">
      <PageHeader
        kicker={<p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-violet">09 / PRIVATE</p>}
        title="Recruiter Analytics"
        subtitle="Private assistant engagement metrics."
      />
      <AnalyticsDashboard />
    </PageContainer>
  );
}
