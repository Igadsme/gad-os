"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  getSkillEvidence,
  skillCategories,
  skills,
  type SkillCategory,
} from "@/data/skills";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
    <div className="grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)_minmax(280px,340px)]">
      <Card className="p-2">
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
              "block w-full rounded-xl px-3 py-2 text-left text-sm",
              category === item && "bg-primary-soft text-primary",
            )}
          >
            {item}
          </button>
        ))}
      </Card>
      <Card className="p-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {inCategory.map((skill) => (
            <button
              key={skill.id}
              type="button"
              onClick={() => setSelectedId(skill.id)}
              className={cn(
                "rounded-2xl border border-border px-3 py-4 text-sm font-medium",
                selected?.id === skill.id && "border-primary bg-primary-soft text-primary",
              )}
            >
              {skill.name}
            </button>
          ))}
        </div>
      </Card>
      <Card className="p-5">
        {selected && evidence && (
          <>
            <h2 className="text-xl font-semibold">{selected.name}</h2>
            <p className="mt-1 text-sm text-muted">
              Used across {evidence.projectCount} project
              {evidence.projectCount === 1 ? "" : "s"} and {evidence.roleCount} role
              {evidence.roleCount === 1 ? "" : "s"}.
            </p>
            <h3 className="mt-5 text-sm font-semibold">Evidence in action</h3>
            <div className="mt-3 space-y-3">
              {evidence.items.length === 0 && (
                <p className="text-sm text-muted">
                  Listed on the résumé. Open a related case study from Projects or
                  Experience for narrative context.
                </p>
              )}
              {evidence.items.map((item) => (
                <div key={item.title} className="rounded-xl border border-border p-3">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted">{item.kind}</p>
                  <p className="mt-1 text-sm text-muted">{item.description}</p>
                  <Link href={item.href} className="mt-2 inline-block text-sm text-primary">
                    {item.hrefLabel} →
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
