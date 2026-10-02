import { AssistantShell } from "@/components/assistant/native/features/chat/AssistantShell";
import { ErrorBoundary } from "@/components/assistant/native/features/chat/ErrorBoundary";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const metadata = {
  title: "Ask Imani",
  description: "Ask grounded questions about Imani Gad's résumé, projects, and experience.",
};

export default function AssistantPage() {
  return (
    <PageContainer width="wide">
      <PageHeader
        kicker={<p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-violet">09 / AI ASSISTANT</p>}
        title="Ask Imani"
        subtitle="Explore verified experience, technical skills, projects, internships, and résumé details."
      />
      <ErrorBoundary>
        <AssistantShell />
      </ErrorBoundary>
    </PageContainer>
  );
}
