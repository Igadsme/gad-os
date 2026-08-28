"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bot,
  Box,
  Braces,
  BrainCircuit,
  CloudCog,
  Code2,
  Coffee,
  Database,
  FileCode2,
  Network,
  ServerCog,
  ShieldCheck,
  Terminal,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  getSkillEvidence,
  skillCategories,
  skills,
  type Skill,
  type SkillCategory,
} from "@/data/skills";
import { cn } from "@/lib/utils";

const categoryIcon: Record<SkillCategory, LucideIcon> = {
  Languages: Braces,
  Frameworks: Code2,
  Cloud: CloudCog,
  "AI/ML": BrainCircuit,
  Security: ShieldCheck,
  Tools: Wrench,
};

const skillMarks: Record<string, { label?: string; tone: string; icon?: LucideIcon }> = {
  python: { label: "Py", tone: "bg-gradient-to-br from-[#3776ab] to-[#ffd343] text-white" },
  typescript: { label: "TS", tone: "bg-[#3178c6] text-white" },
  javascript: { label: "JS", tone: "bg-[#f7df1e] text-black" },
  sql: { tone: "bg-black text-white", icon: Database },
  go: { label: "GO", tone: "bg-cyan-50 text-[#00add8]" },
  java: { tone: "bg-orange-50 text-[#e76f00]", icon: Coffee },
  bash: { tone: "bg-slate-100 text-slate-900", icon: Terminal },
  cpp: { label: "C++", tone: "bg-[#00599c] text-white" },
  csharp: { label: "C#", tone: "bg-[#68217a] text-white" },
  html: { label: "5", tone: "bg-[#e34f26] text-white" },
  css: { label: "3", tone: "bg-[#1572b6] text-white" },
  yaml: { label: "Y", tone: "bg-blue-50 text-blue-600" },
  json: { tone: "bg-slate-50 text-black", icon: Braces },
  nextjs: { label: "N", tone: "bg-black text-white" },
  react: { label: "⚛", tone: "bg-sky-50 text-[#087ea4]" },
  nodejs: { label: "JS", tone: "bg-[#339933] text-white" },
  fastapi: { label: "FA", tone: "bg-[#009688] text-white" },
  flask: { tone: "bg-slate-100 text-slate-900", icon: FileCode2 },
  pytorch: { label: "PT", tone: "bg-orange-50 text-[#ee4c2c]" },
  tensorflow: { label: "TF", tone: "bg-orange-50 text-[#ff6f00]" },
  numpy: { label: "NP", tone: "bg-blue-50 text-[#4dabcf]" },
  pandas: { label: "PD", tone: "bg-indigo-50 text-[#150458]" },
  prisma: { label: "P", tone: "bg-slate-100 text-[#2d3748]" },
  aws: { label: "AWS", tone: "bg-slate-950 text-[#ff9900]" },
  docker: { label: "D", tone: "bg-blue-50 text-[#2496ed]" },
  postgresql: { label: "PG", tone: "bg-[#4169e1] text-white" },
  redis: { label: "R", tone: "bg-[#dc382d] text-white" },
  mongodb: { label: "M", tone: "bg-green-50 text-[#47a248]" },
  mysql: { label: "MY", tone: "bg-sky-50 text-[#4479a1]" },
  rag: { tone: "bg-violet-50 text-violet", icon: Network },
  embeddings: { tone: "bg-violet-50 text-violet", icon: Box },
  yolov8: { label: "YO", tone: "bg-fuchsia-50 text-fuchsia-600" },
  "gemini-api": { label: "✦", tone: "bg-blue-50 text-blue-600" },
  "openai-api": { label: "◎", tone: "bg-slate-100 text-slate-900" },
  pinecone: { tone: "bg-violet-50 text-violet", icon: Database },
  sentinel: { tone: "bg-cyan-50 text-cyan-600", icon: ShieldCheck },
  kql: { label: "KQL", tone: "bg-blue-50 text-blue-700" },
  cef: { label: "CEF", tone: "bg-amber-50 text-amber-700" },
  "log-analytics": { tone: "bg-sky-50 text-sky-600", icon: Network },
  "palo-alto": { label: "PA", tone: "bg-orange-50 text-orange-600" },
  servicenow: { label: "SN", tone: "bg-green-50 text-green-700" },
  "rest-api": { label: "API", tone: "bg-blue-50 text-blue-600" },
  "integration-hub": { tone: "bg-violet-50 text-violet", icon: Workflow },
  git: { label: "G", tone: "bg-orange-50 text-[#f05032]" },
  github: { label: "GH", tone: "bg-black text-white" },
  jira: { label: "J", tone: "bg-blue-50 text-[#0052cc]" },
  jenkins: { label: "J", tone: "bg-red-50 text-red-600" },
  tableau: { label: "T", tone: "bg-sky-50 text-sky-700" },
  cucumber: { label: "C", tone: "bg-green-50 text-green-600" },
  cypress: { label: "CY", tone: "bg-slate-100 text-slate-900" },
  azure: { label: "AZ", tone: "bg-blue-50 text-[#0078d4]" },
};

function SkillMark({ skill, large = false }: { skill: Skill; large?: boolean }) {
  if (skill.id === "python") {
    return (
      <span
        className={cn(
          "relative block shrink-0 rounded-xl bg-slate-50 shadow-sm",
          large ? "size-12" : "size-11",
        )}
        aria-hidden
      >
        <span className="absolute left-[18%] top-[16%] h-[38%] w-[55%] rounded-[7px] bg-[#3776ab]">
          <span className="absolute left-[24%] top-[24%] size-1 rounded-full bg-white/90" />
        </span>
        <span className="absolute bottom-[16%] right-[18%] h-[38%] w-[55%] rounded-[7px] bg-[#ffd343]">
          <span className="absolute bottom-[24%] right-[24%] size-1 rounded-full bg-[#594d00]/70" />
        </span>
      </span>
    );
  }

  const fallbackIcon = categoryIcon[skill.category];
  const mark = skillMarks[skill.id] ?? {
    label: skill.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase(),
    tone: "bg-primary-soft text-primary",
  };
  const Icon = mark.icon ?? fallbackIcon;

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-xl font-display font-black tracking-[-0.05em] shadow-sm",
        large ? "size-12 text-base" : "size-11 text-sm",
        mark.tone,
      )}
      aria-hidden
    >
      {mark.label ? mark.label : <Icon className={large ? "size-6" : "size-5"} />}
    </span>
  );
}

const evidenceIcons = [ServerCog, Workflow, BrainCircuit, ShieldCheck, Bot];
const evidenceTones = [
  "bg-emerald-50 text-emerald-700",
  "bg-violet-50 text-violet",
  "bg-blue-50 text-blue-700",
  "bg-cyan-50 text-cyan-700",
  "bg-amber-50 text-amber-700",
];

export function SkillsExplorer() {
  const searchParams = useSearchParams();
  const initialSkill = searchParams.get("skill");
  const initial = skills.find((skill) => skill.id === initialSkill) ?? skills[0];
  const [category, setCategory] = useState<SkillCategory>(initial.category);
  const [selectedId, setSelectedId] = useState(initial.id);

  const inCategory = useMemo(
    () => skills.filter((skill) => skill.category === category),
    [category],
  );
  const selected = inCategory.find((skill) => skill.id === selectedId) ?? inCategory[0];
  const evidence = selected ? getSkillEvidence(selected) : null;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.03)] lg:grid lg:grid-cols-[150px_minmax(320px,0.9fr)_minmax(360px,1.25fr)]">
      <aside className="border-b border-border p-4 lg:border-b-0 lg:border-r">
        <p className="mb-3 text-xs font-semibold">Categories</p>
        <div className="flex gap-1 overflow-x-auto lg:block lg:space-y-1">
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
                "min-h-11 shrink-0 rounded-lg px-3 text-left text-sm transition-colors lg:block lg:w-full",
                category === item
                  ? "bg-primary-soft font-semibold text-primary"
                  : "text-muted hover:bg-surface-muted hover:text-foreground",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </aside>

      <section className="border-b border-border p-4 lg:border-b-0 lg:border-r">
        <p className="mb-4 text-sm font-semibold">{category}</p>
        <div className="grid grid-cols-3 gap-2.5">
          {inCategory.map((skill) => (
            <button
              key={skill.id}
              type="button"
              onClick={() => setSelectedId(skill.id)}
              className={cn(
                "group flex aspect-[0.92/1] min-h-[104px] flex-col items-center justify-center rounded-xl border bg-surface px-2 py-3 text-center transition-all",
                selected?.id === skill.id
                  ? "border-primary shadow-[0_0_0_1px_var(--color-primary)]"
                  : "border-border hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm",
              )}
            >
              <SkillMark skill={skill} />
              <span className="mt-3 w-full truncate text-xs font-semibold">{skill.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="p-4 lg:p-5">
        {selected && evidence ? (
          <>
            <div className="flex items-center gap-3 border-b border-border pb-5">
              <SkillMark skill={selected} large />
              <div className="min-w-0">
                <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">
                  {selected.name}
                </h2>
                <p className="mt-0.5 text-xs text-muted">
                  Used across {evidence.projectCount} project{evidence.projectCount === 1 ? "" : "s"} and {evidence.roleCount} role{evidence.roleCount === 1 ? "" : "s"}
                </p>
              </div>
            </div>

            <h3 className="mb-3 mt-5 text-sm font-semibold">Evidence in Action</h3>
            <div className="space-y-3">
              {evidence.items.length === 0 ? (
                <div className="rounded-xl border border-border p-4">
                  <p className="text-sm font-medium">Résumé skill</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Included in the technical toolkit and ready for the next project.
                  </p>
                  <Link href="/resume" className="mt-2 inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-primary">
                    View Résumé <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              ) : (
                evidence.items.slice(0, 4).map((item, index) => {
                  const Icon = evidenceIcons[index % evidenceIcons.length];
                  return (
                    <article key={`${item.href}-${item.title}`} className="rounded-xl border border-border p-4 transition-colors hover:border-primary/30">
                      <div className="flex gap-3">
                        <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl", evidenceTones[index % evidenceTones.length])}>
                          <Icon className="size-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-semibold">{item.title}</h4>
                            <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold text-primary">
                              {item.kind}
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">{item.description}</p>
                          <Link href={item.href} className="mt-1 inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-primary hover:underline">
                            View {item.title} {item.hrefLabel}
                            <ArrowRight className="size-3.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}
