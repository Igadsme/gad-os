import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { RecruiterCta } from "@/components/shared/recruiter-cta";

export const metadata = {
  title: "Projects",
  description: "Selected product engineering, developer tooling, security, and machine learning research projects by Imani Gad.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Projects"
        subtitle="Product engineering, developer tooling, security investigation, and machine learning research."
      />
      <ProjectsExplorer />
      <RecruiterCta className="mt-8" />
    </PageContainer>
  );
}
