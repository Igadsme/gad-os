import { ResumeStudio } from "@/components/resume/resume-studio";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const metadata = {
  title: "Résumé",
  description: "View or download Imani Gad’s software engineering résumé.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <PageContainer width="wide">
      <PageHeader title="Résumé" subtitle="Experience, education, projects, and technical skills." />
      <ResumeStudio />
    </PageContainer>
  );
}
