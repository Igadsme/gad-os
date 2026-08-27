import { Suspense } from "react";
import { ExperienceExplorer } from "@/components/experience/experience-explorer";

export const metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Experience</h1>
        <p className="mt-2 text-muted">
          A timeline of roles, impact, and growth.
        </p>
      </header>
      <Suspense>
        <ExperienceExplorer />
      </Suspense>
    </div>
  );
}
