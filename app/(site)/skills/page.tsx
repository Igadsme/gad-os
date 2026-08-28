import { Suspense } from "react";
import { SkillsExplorer } from "@/components/skills/skills-explorer";
import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Skills Explorer"
        subtitle="Explore technologies, tools, and frameworks with real-world evidence."
      />
      <Suspense fallback={<Skeleton className="h-80" />}>
        <SkillsExplorer />
      </Suspense>
    </PageContainer>
  );
}
