"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  BrainCircuit,
  Braces,
  CloudCog,
  Database,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  getSkillEvidence,
  skillCategories,
  skills,
  type SkillCategory,
} from "@/data/skills";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { cn } from "@/lib/utils";

const categoryVisual: Record<SkillCategory, { tone: string; icon: LucideIcon }> = {
  Languages: { tone: "bg-primary-soft text-primary", icon: Braces },
  Frameworks: { tone: "bg-violet-soft text-violet", icon: Database },
  Cloud: { tone: "bg-success-soft text-success", icon: CloudCog },
  "AI/ML": { tone: "bg-[#fff1ed] text-coral", icon: BrainCircuit },
  Security: { tone: "bg-surface-muted text-foreground", icon: ShieldCheck },
  Tools: { tone: "bg-[#fff5e4] text-amber", icon: Wrench },
};

function SkillThumbnail({ name, category, index }: { name: string; category: SkillCategory; index: number }) {
  const mark = name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase();
  const visual = categoryVisual[category];
  const Icon = visual.icon;
  return (
    <span
      className={cn("skill-thumbnail flex h-14 w-full items-center justify-between rounded-lg px-3", visual.tone)}
      aria-hidden
    >
      <span className="font-display text-lg font-bold tracking-[-0.04em]">{mark}</span>
      <span className="flex size-8 items-center justify-center rounded-lg bg-white/60">
        <Icon className="size-4" />
      </span>
      <span className="sr-only">{String(index + 1).padStart(2, "0")}</span>
    </span>
  );
}

export function SkillsExplorer() {
  const searchParams = useSearchParams();
  const initialSkill = searchParams.get("skill");
  const initial =
    skills.find((skill) => skill.id === initialSkill) ??
    skills.find((skill) => skill.category === "Languages") ??
    skills[0];

  const [category, setCategory] = useState<SkillCategory>(initial.category);
  const [selectedId, setSelectedId] = useState(initial.id);

  const inCategory = useMemo(
    () => skills.filter((skill) => skill.category === category),
    [category],
  );
  const selected =
    inCategory.find((skill) => skill.id === selectedId) ?? inCategory[0];
  const evidence = selected ? getSkillEvidence(selected) : null;

  return (
    <div className="grid gap-4 lg:grid-cols-[156px_minmax(0,1fr)_minmax(270px,330px)]">
      <Card className="flex gap-1 overflow-x-auto p-1.5 lg:block">
        {skillCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setCategory(item);
              const first = skills.find((skill) => skill.category === item);
              if (first) setSelectedId(first.id);
            }}
            className={cn(
              "min-h-11 shrink-0 rounded-full px-4 text-left text-sm font-semibold lg:block lg:w-full lg:rounded-xl lg:px-3",
              category === item && "bg-primary-soft text-primary",
            )}
          >
            {item}
          </button>
        ))}
      </Card>
      <Card className="p-3">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {inCategory.map((skill, index) => (
            <button
              key={skill.id}
              type="button"
              onClick={() => setSelectedId(skill.id)}
              className={cn(
                "group flex min-h-11 flex-col rounded-xl border border-border bg-surface p-2 text-left text-[13px] font-semibold transition-colors hover:border-primary/30",
                selected?.id === skill.id && "border-primary bg-primary-soft text-primary",
              )}
            >
              <SkillThumbnail name={skill.name} category={skill.category} index={index} />
              <span className="w-full truncate px-1 pb-0.5 pt-2">{skill.name}</span>
            </button>
          ))}
        </div>
      </Card>
      <Card className="px-4 py-4">
        {selected && evidence ? (
          <>
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-display text-xl font-bold">{selected.name}</h2>
              <StatusPill tone="study">{selected.category}</StatusPill>
            </div>
            <p className="mt-1 text-sm text-muted">
              Used across {evidence.projectCount} project
              {evidence.projectCount === 1 ? "" : "s"} and {evidence.roleCount} role
              {evidence.roleCount === 1 ? "" : "s"}.
            </p>
            <h3 className="mt-4 text-sm font-semibold">Evidence</h3>
            <div className="mt-2 space-y-2">
              {evidence.items.length === 0 ? (
                <p className="text-sm text-muted">
                  Listed on the résumé. Open Projects or Experience for narrative context.
                </p>
              ) : (
                evidence.items.slice(0, 4).map((item) => (
                  <div key={`${item.href}-${item.title}`} className="rounded-xl border border-border px-3 py-2.5">
                    <p className="text-[13px] font-medium leading-4">{item.title}</p>
                    <p className="text-[11px] text-muted">{item.kind}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">
                      {item.description}
                    </p>
                    <Link
                      href={item.href}
                      className="mt-1.5 inline-flex min-h-11 items-center text-sm text-primary"
                    >
                      {item.hrefLabel}
                    </Link>
                  </div>
                ))
              )}
            </div>
          </>
        ) : null}
      </Card>
    </div>
  );
}
