import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { RecruiterCta } from "@/components/shared/recruiter-cta";

export const metadata = {
  title: "Projects",
  description: "Selected full-stack, applied AI, and security engineering projects by Imani Gad.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Projects"
        subtitle="Products, systems, and experiments built to solve real problems."
      />
      <ProjectsExplorer />
      <RecruiterCta className="mt-8" />
    </PageContainer>
  );
}
