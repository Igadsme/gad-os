import { AssistantChat } from "@/components/assistant/assistant-chat";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const metadata = {
  title: "Ask April",
  description: "Ask April grounded questions about Imani Gad's résumé, projects, and experience.",
};

export default function AssistantPage() {
  return (
    <PageContainer width="wide">
      <PageHeader
        kicker={<p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-violet">09 / ASSISTANT</p>}
        title="Ask April"
        subtitle="A recruiter-facing assistant grounded in the résumé, project case studies, and verified experience."
      />
      <AssistantChat />
    </PageContainer>
  );
}
