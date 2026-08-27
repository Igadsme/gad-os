import { Suspense } from "react";
import { SkillsExplorer } from "@/components/skills/skills-explorer";
import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Skills"
        subtitle="Browse tools and technologies with evidence from projects and roles."
      />
      <Suspense fallback={<Skeleton className="h-80" />}>
        <SkillsExplorer />
      </Suspense>
    </PageContainer>
  );
}
