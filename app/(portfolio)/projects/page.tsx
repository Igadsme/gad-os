import { ProjectsExplorer } from "@/components/projects/projects-explorer";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-2 text-muted">
          Products, systems, and experiments built to solve real problems.
        </p>
      </header>
      <ProjectsExplorer />
    </div>
  );
}
