import { Suspense } from "react";
import { SkillsExplorer } from "@/components/skills/skills-explorer";

export const metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Skills Explorer</h1>
        <p className="mt-2 text-muted">
          Explore technologies, tools, and frameworks with real-world evidence.
        </p>
      </header>
      <Suspense>
        <SkillsExplorer />
      </Suspense>
    </div>
  );
}
