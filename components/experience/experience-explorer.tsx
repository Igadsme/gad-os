"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  experience,
  experienceTypeLabels,
  type ExperienceType,
} from "@/data/experience";
import { Badge, Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const filters: Array<"all" | ExperienceType> = [
  "all",
  "internship",
  "co-op",
  "fellowship",
  "teaching",
];

export function ExperienceExplorer() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("role") ?? experience[0]?.id;
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [selectedId, setSelectedId] = useState(initial);

  const visible = useMemo(
    () =>
      experience.filter((role) => filter === "all" || role.type === filter),
    [filter],
  );

  const selected =
    visible.find((role) => role.id === selectedId) ?? visible[0];

  if (!selected) {
    return <p className="text-sm text-muted">No roles in this filter.</p>;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={cn(
              "rounded-full border border-border px-3 py-1.5 text-sm text-muted",
              filter === item && "border-primary/30 bg-primary text-white",
            )}
          >
            {item === "all" ? "All" : experienceTypeLabels[item]}
          </button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Card className="p-2">
          <ul>
            {visible.map((role) => (
              <li key={role.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(role.id)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left",
                    selected.id === role.id && "bg-primary-soft",
                  )}
                >
                  <span
                    className="mt-0.5 flex size-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                    style={{ background: role.color }}
                  >
                    {role.company.slice(0, 1)}
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{role.company}</span>
                    <span className="block text-xs text-muted">{role.role}</span>
                    <span className="block text-xs text-muted">
                      {role.start} – {role.end}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6">
          <div className="flex items-start gap-3">
            <span
              className="flex size-12 items-center justify-center rounded-2xl text-lg font-bold text-white"
              style={{ background: selected.color }}
            >
              {selected.company.slice(0, 1)}
            </span>
            <div>
              <h2 className="text-xl font-semibold">{selected.company}</h2>
              <p className="text-sm text-muted">{selected.role}</p>
              <p className="mt-1 text-sm text-muted">
                {selected.start} – {selected.end} · {selected.location} ·{" "}
                {selected.locationType}
              </p>
            </div>
          </div>
          <section className="mt-6">
            <h3 className="font-semibold">About the Role</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{selected.summary}</p>
          </section>
          <section className="mt-5">
            <h3 className="font-semibold">Key Responsibilities</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-muted">
              {selected.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </section>
          {selected.impact && (
            <div className="mt-5 rounded-2xl bg-success-soft p-4">
              <p className="text-sm font-semibold text-success">Impact</p>
              <p className="mt-1 text-lg font-semibold">{selected.impact.metric}</p>
              <p className="mt-1 text-sm text-muted">{selected.impact.explanation}</p>
            </div>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            {selected.technologies.map((tech) => (
              <Badge key={tech} tone="muted">
                {tech}
              </Badge>
            ))}
          </div>
          {selected.linkedin && (
            <a
              href={selected.linkedin}
              className="mt-5 inline-block text-sm text-primary"
              target="_blank"
              rel="noreferrer"
            >
              View on LinkedIn →
            </a>
          )}
        </Card>
      </div>
    </div>
  );
}
