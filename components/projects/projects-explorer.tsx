"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";
import { ProjectCard, ProjectListRow } from "@/components/projects/project-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ProjectsExplorer({
  initialCategory,
  initialQuery,
}: {
  initialCategory?: string;
  initialQuery?: string;
}) {
  const [category, setCategory] = useState<ProjectCategory | "All">(
    projectCategories.includes(initialCategory as ProjectCategory)
      ? (initialCategory as ProjectCategory)
      : "All",
  );
  const [query, setQuery] = useState(initialQuery ?? "");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        category === "All" || project.categories.includes(category);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        `${project.title} ${project.summary} ${project.technologies.join(" ")}`
          .toLowerCase()
          .includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex flex-wrap gap-2">
          {(["All", ...projectCategories] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                "rounded-full border border-border px-3 py-1.5 text-sm text-muted",
                category === item && "border-primary/30 bg-primary text-white",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-1 items-center gap-2 lg:justify-end">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects..."
            className="max-w-xs"
          />
          <div className="flex rounded-xl border border-border bg-surface p-1">
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => setView("grid")}
              className={`rounded-lg p-1.5 ${view === "grid" ? "bg-primary-soft text-primary" : "text-muted"}`}
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              type="button"
              aria-label="List view"
              onClick={() => setView("list")}
              className={`rounded-lg p-1.5 ${view === "list" ? "bg-primary-soft text-primary" : "text-muted"}`}
            >
              <List className="size-4" />
            </button>
          </div>
        </div>
      </div>
      {filtered.length === 0 ? (
        <p className="text-sm text-muted">No projects match that filter.</p>
      ) : view === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((project) => (
            <ProjectListRow key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
