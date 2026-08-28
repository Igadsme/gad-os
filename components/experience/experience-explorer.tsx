"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  experience,
  type Experience,
  type ExperienceType,
} from "@/data/experience";
import { Card } from "@/components/ui/card";
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

const companyOrder = ["shaw", "wellstar", "headstarter", "truespice", "upcancer", "lutheran"];

const companyLogos: Record<string, string> = {
  upcancer: "/company-logos/upcancer.svg",
  truespice: "/company-logos/truespice.svg",
  wellstar: "/company-logos/wellstar.svg",
  headstarter: "/company-logos/headstarter.svg",
  shaw: "/company-logos/shaw.svg",
  lutheran: "/company-logos/lutheran.svg",
};

function CompanyLogo({ role, large = false }: { role: Experience; large?: boolean }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden bg-white shadow-sm ring-1 ring-slate-200",
        large ? "size-12 rounded-xl" : "size-8 rounded-lg",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={companyLogos[role.id]}
        alt={`${role.company} logo`}
        className="size-full object-contain"
      />
    </span>
  );
}

function shortDate(date: string) {
  return date.replace("January", "Jan").replace("February", "Feb").replace("March", "Mar").replace("April", "Apr").replace("August", "Aug").replace("September", "Sep").replace("October", "Oct").replace("November", "Nov").replace("December", "Dec");
}

export function ExperienceExplorer() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("role") ?? experience[0]?.id;
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selectedId, setSelectedId] = useState(initial);

  const type = filterMap[filter];
  const visible = useMemo(
    () => experience
      .filter((role) => type === "all" || role.type === type)
      .toSorted((a, b) => companyOrder.indexOf(a.id) - companyOrder.indexOf(b.id)),
    [type],
  );
  const selected = visible.find((role) => role.id === selectedId) ?? visible[0];

  if (!selected) {
    return <EmptyState title="No roles in this filter." detail="Choose another role type to see résumé experience." />;
  }

  return (
    <div className="space-y-4">
      <FilterPills items={filters} value={filter} onChange={(value) => setFilter(value as (typeof filters)[number])} />

      <div className="grid gap-3 lg:grid-cols-[260px_minmax(0,1fr)]">
        <Card className="overflow-hidden p-1.5">
          <ul>
            {visible.map((role) => {
              const active = selected.id === role.id;
              return (
                <li key={role.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(role.id)}
                    className={cn(
                      "relative flex min-h-[72px] w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                      active ? "bg-primary-soft" : "hover:bg-surface-muted",
                    )}
                  >
                    {active ? <span className="absolute inset-y-0 left-0 w-[3px] rounded-r-full bg-primary" /> : null}
                    <CompanyLogo role={role} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold leading-4">{role.company}</span>
                      <span className="mt-1 block truncate text-[11px] text-muted">{role.role}</span>
                      <span className="mt-0.5 block text-[10px] text-muted">
                        {shortDate(role.start)} – {shortDate(role.end)}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="px-5 py-5 sm:px-6 sm:py-6">
          <header className="flex items-start gap-4">
            <CompanyLogo role={selected} large />
            <div className="min-w-0">
              <h2 className="font-display text-xl font-semibold leading-6 tracking-[-0.02em]">{selected.company}</h2>
              <p className="mt-0.5 text-sm text-muted">{selected.role}</p>
              <p className="mt-1.5 text-xs text-muted">
                {shortDate(selected.start)} – {shortDate(selected.end)} · {selected.location} · {selected.locationType}
              </p>
            </div>
          </header>

          <section className="mt-7">
            <h3 className="text-sm font-semibold">About the Role</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{selected.summary}</p>
          </section>

          <section className="mt-6">
            <h3 className="text-sm font-semibold">Key Responsibilities</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted">
              {selected.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </section>

          {selected.impact ? (
            <section className="mt-6">
              <h3 className="text-sm font-semibold">Impact</h3>
              <div className="mt-2 rounded-xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-4">
                <p className="text-sm font-semibold text-emerald-700">{selected.impact.metric}</p>
                <p className="mt-1 text-xs leading-5 text-emerald-800/80">{selected.impact.explanation}</p>
              </div>
            </section>
          ) : null}

          <section className="mt-6">
            <h3 className="text-sm font-semibold">Technologies</h3>
            <ul className="mt-2 flex flex-wrap gap-2" aria-label={`${selected.company} technologies`}>
              {selected.technologies.map((technology) => (
                <li key={technology} className="rounded-md bg-surface-muted px-2.5 py-1 text-xs text-muted">
                  {technology}
                </li>
              ))}
            </ul>
          </section>
        </Card>
      </div>
    </div>
  );
}
