import { ResumeStudio } from "@/components/resume/resume-studio";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const metadata = { title: "Résumé" };

export default function ResumePage() {
  return (
    <PageContainer>
      <PageHeader
        title="Résumé"
        subtitle="View, download, and share your professional résumé."
      />
      <ResumeStudio />
    </PageContainer>
  );
}
