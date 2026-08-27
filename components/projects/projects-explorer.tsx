"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";
import { ProjectCard, ProjectListRow } from "@/components/projects/project-card";
import { FilterPills } from "@/components/ui/filter-pills";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Tooltip } from "@/components/ui/tooltip";
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
        <FilterPills
          items={["All", ...projectCategories]}
          value={category}
          onChange={(value) => setCategory(value as ProjectCategory | "All")}
        />
        <div className="flex flex-1 items-center gap-2 lg:justify-end">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects..."
            className="max-w-xs"
            aria-label="Search projects"
          />
          <div className="flex rounded-xl border border-border bg-surface p-1">
            <Tooltip label="Grid view">
              <button
                type="button"
                aria-label="Grid view"
                aria-pressed={view === "grid"}
                onClick={() => setView("grid")}
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-lg",
                  view === "grid" ? "bg-primary-soft text-primary" : "text-muted",
                )}
              >
                <LayoutGrid className="size-4" />
              </button>
            </Tooltip>
            <Tooltip label="List view">
              <button
                type="button"
                aria-label="List view"
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-lg",
                  view === "list" ? "bg-primary-soft text-primary" : "text-muted",
                )}
              >
                <List className="size-4" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      {filtered.length === 0 ? (
        <EmptyState
          title="No projects match that filter."
          detail="Try another category or clear the search."
        />
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
