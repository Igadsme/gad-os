import { Suspense } from "react";
import { ExperienceExplorer } from "@/components/experience/experience-explorer";
import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <PageContainer>
      <PageHeader
        title="Experience"
        subtitle="A timeline of roles, impact, and growth."
      />
      <Suspense fallback={<Skeleton className="h-96" />}>
        <ExperienceExplorer />
      </Suspense>
    </PageContainer>
  );
}
