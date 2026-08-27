"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  experience,
  experienceTypeLabels,
  type ExperienceType,
} from "@/data/experience";
import { projects } from "@/data/projects";
import { Badge, Card } from "@/components/ui/card";
import { FilterPills } from "@/components/ui/filter-pills";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

const filters = ["All", "Internship", "Co-op", "Fellowship", "Teaching"] as const;
const filterMap: Record<(typeof filters)[number], "all" | ExperienceType> = {
  All: "all",
  Internship: "internship",
  "Co-op": "co-op",
  Fellowship: "fellowship",
  Teaching: "teaching",
};

export function ExperienceExplorer() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("role") ?? experience[0]?.id;
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selectedId, setSelectedId] = useState(initial);

  const type = filterMap[filter];
  const visible = useMemo(
    () => experience.filter((role) => type === "all" || role.type === type),
    [type],
  );

  const selected =
    visible.find((role) => role.id === selectedId) ?? visible[0];

  if (!selected) {
    return (
      <EmptyState
        title="No roles in this filter."
        detail="Choose another role type to see résumé experience."
      />
    );
  }

  const relatedProjects = projects.filter(
    (project) => project.relatedExperienceId === selected.id,
  );

  return (
    <div className="space-y-5">
      <FilterPills
        items={filters}
        value={filter}
        onChange={(value) => setFilter(value as (typeof filters)[number])}
      />
      <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
        <Card className="p-1.5">
          <ul>
            {visible.map((role) => {
              const active = selected.id === role.id;
              return (
                <li key={role.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(role.id)}
                    className={cn(
                      "relative flex min-h-11 w-full items-start gap-2.5 rounded-xl px-2.5 py-2.5 text-left",
                      active && "bg-primary-soft text-primary",
                    )}
                  >
                    {active ? (
                      <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-primary" />
                    ) : null}
                    <span
                      className="mt-0.5 flex size-7 items-center justify-center rounded-md text-[11px] font-bold text-white"
                      style={{ background: role.color }}
                    >
                      {role.company.slice(0, 1)}
                    </span>
                    <span>
                      <span className="block text-[13px] font-medium leading-4">
                        {role.company}
                      </span>
                      <span className="block text-[11px] text-muted">{role.role}</span>
                      <span className="block text-[11px] text-muted">
                        {role.start} – {role.end}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>
        <Card className="px-5 py-5">
          <div className="flex items-start gap-3">
            <span
              className="flex size-10 items-center justify-center rounded-xl text-sm font-bold text-white"
              style={{ background: selected.color }}
            >
              {selected.company.slice(0, 1)}
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold leading-6">{selected.company}</h2>
              <p className="text-sm text-muted">{selected.role}</p>
              <p className="mt-1 text-xs text-muted">
                {selected.start} – {selected.end} · {selected.location} ·{" "}
                {experienceTypeLabels[selected.type]}
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {selected.technologies.map((tech) => (
              <Badge key={tech} tone="muted" className="text-[11px]">
                {tech}
              </Badge>
            ))}
          </div>
          <section className="mt-4">
            <h3 className="text-sm font-semibold">Role summary</h3>
            <p className="mt-1.5 text-sm leading-6 text-muted">{selected.summary}</p>
          </section>
          <section className="mt-4">
            <h3 className="text-sm font-semibold">Key responsibilities</h3>
            <ul className="mt-1.5 list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted">
              {selected.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </section>
          {selected.impact ? (
            <div className="mt-4 rounded-[14px] bg-success-soft px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-success">
                Verified impact
              </p>
              <p className="mt-1 text-base font-semibold">{selected.impact.metric}</p>
              <p className="mt-1 text-sm text-muted">{selected.impact.explanation}</p>
            </div>
          ) : null}
          {relatedProjects.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold">Related projects</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {relatedProjects.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-border px-3 text-sm text-primary"
                    >
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {selected.linkedin ? (
            <a
              href={selected.linkedin}
              className="mt-4 inline-flex min-h-11 items-center text-sm text-primary"
              target="_blank"
              rel="noreferrer"
            >
              View on LinkedIn
            </a>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
