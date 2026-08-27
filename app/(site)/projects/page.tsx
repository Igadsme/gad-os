import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Projects"
        subtitle="Products, systems, and experiments built to solve real problems."
      />
      <ProjectsExplorer />
    </PageContainer>
  );
}
