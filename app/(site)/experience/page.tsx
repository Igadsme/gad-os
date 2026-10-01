import { Suspense } from "react";
import { ExperienceExplorer } from "@/components/experience/experience-explorer";
import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { RecruiterCta } from "@/components/shared/recruiter-cta";

export const metadata = {
  title: "Professional Experience",
  description: "Imani Gad’s backend, enterprise platform, applied AI, and cybersecurity experience.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <PageContainer>
      <PageHeader
        title="Professional Experience"
        subtitle="Backend services, enterprise platforms, applied AI, and cybersecurity operations."
      />
      <Suspense fallback={<Skeleton className="h-96" />}>
        <ExperienceExplorer />
      </Suspense>
      <RecruiterCta className="mt-8" />
    </PageContainer>
  );
}
