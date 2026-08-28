import { Suspense } from "react";
import { ExperienceExplorer } from "@/components/experience/experience-explorer";
import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { RecruiterCta } from "@/components/shared/recruiter-cta";

export const metadata = {
  title: "Experience",
  description: "Imani Gad’s software engineering, platform automation, and security engineering experience.",
  alternates: { canonical: "/experience" },
};

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
      <RecruiterCta className="mt-8" />
    </PageContainer>
  );
}
