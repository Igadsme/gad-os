import Link from "next/link";
import { Check } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge, Card } from "@/components/ui/card";
import { ProjectVisual } from "@/components/projects/project-visual";
import { StatusPill, statusTone } from "@/components/ui/status-pill";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <Card hoverable className="flex h-full flex-col overflow-hidden">
      <div className="media-zoom relative">
        <ProjectVisual slug={project.slug} className={compact ? "h-36" : "h-44"} />
        <div className="absolute inset-x-3 bottom-3 flex gap-2">
          {project.visualMetrics.map((metric) => (
            <div key={metric.label} className="project-metric min-w-0 flex-1 rounded-lg px-2.5 py-1.5">
              <p className="font-display text-sm font-bold leading-none">{metric.value}</p>
              <p className="mt-1 truncate text-[9px] font-medium text-muted">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col px-[18px] py-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display text-[17px] font-bold leading-5">{project.title}</h3>
            <p className="mt-0.5 text-xs text-muted">{project.category}</p>
          </div>
          <StatusPill tone={statusTone(project.status)}>{project.status}</StatusPill>
        </div>
        <p className="mt-2 line-clamp-3 text-sm leading-5 text-muted">
          {compact ? project.subtitle : project.summary}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1">
          {project.technologies.slice(0, compact ? 3 : 5).map((tech) => (
            <Badge key={tech} tone="muted" className="px-2 py-0 text-[11px]">
              {tech}
            </Badge>
          ))}
        </div>
        <p className="mt-2 flex items-start gap-1.5 text-xs leading-5">
          <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
          <span className="line-clamp-2">{project.highlight}</span>
        </p>
        <div className="mt-auto flex items-center gap-3 pt-3 text-sm">
          <Link
            href={`/projects/${project.slug}`}
            className="font-medium text-primary hover:underline"
          >
            Case Study
          </Link>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-foreground"
            >
              Live Demo
            </a>
          ) : (
            <span className="cursor-not-allowed text-muted/60" title="No public demo">
              Live Demo
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

export function ProjectListRow({ project }: { project: Project }) {
  return (
    <Card hoverable className="flex flex-col overflow-hidden md:flex-row">
      <div className="media-zoom relative md:w-64">
        <ProjectVisual slug={project.slug} className="h-40 md:h-full" />
        <div className="absolute inset-x-3 bottom-3 flex gap-2">
          {project.visualMetrics.map((metric) => (
            <div key={metric.label} className="project-metric min-w-0 flex-1 rounded-lg px-2 py-1.5">
              <p className="font-display text-xs font-bold">{metric.value}</p>
              <p className="truncate text-[8px] font-medium text-muted">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col px-[18px] py-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[15px] font-semibold">{project.title}</h3>
            <p className="text-xs text-muted">{project.category}</p>
          </div>
          <StatusPill tone={statusTone(project.status)}>{project.status}</StatusPill>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{project.summary}</p>
        <p className="mt-2 flex items-start gap-1.5 text-xs">
          <Check className="mt-0.5 size-3.5 text-success" />
          {project.highlight}
        </p>
        <div className="mt-3 flex gap-3 text-sm">
          <Link href={`/projects/${project.slug}`} className="font-medium text-primary">
            Case Study
          </Link>
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-muted">
              Live Demo
            </a>
          ) : (
            <span className="text-muted/60">Live Demo</span>
          )}
        </div>
      </div>
    </Card>
  );
}

export function FilterChip({
  active,
  children,
  href,
}: {
  active: boolean;
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-10 items-center rounded-lg border border-border px-3 text-sm text-muted",
        active && "border-primary/20 bg-primary-soft text-primary",
      )}
    >
      {children}
    </Link>
  );
}
