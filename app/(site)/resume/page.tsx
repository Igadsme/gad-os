import { ResumeStudio } from "@/components/resume/resume-studio";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const metadata = {
  title: "Résumé",
  description: "View or download Imani Gad’s software engineering résumé.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <PageContainer>
      <PageHeader
        title="Résumé"
        subtitle="View or download my résumé."
      />
      <ResumeStudio />
    </PageContainer>
  );
}
