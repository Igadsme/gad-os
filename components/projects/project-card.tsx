import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge, Card } from "@/components/ui/card";
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
    <Card hoverable className={cn("project-card group flex h-full flex-col overflow-hidden rounded-[10px]", project.visualStyle && `project-card--${project.visualStyle}`)}>
      <div className="project-card__visual relative aspect-[1.12/1] w-full overflow-hidden border-b border-border bg-surface-muted">
        {project.imageUrl ? <Image src={project.imageUrl} alt={project.imageAlt ?? project.title} fill sizes="(min-width: 1280px) 50vw, (min-width: 768px) 50vw, 100vw" className={cn("transition-transform duration-500 group-hover:scale-105", project.visualStyle === "research" ? "object-contain p-3" : "object-cover")} /> : <ProjectArchitecturePreview project={project} />}
        {project.visualLabel ? <span className="project-card__visual-label">{project.visualLabel}</span> : null}
      </div>
      <div className="flex flex-1 flex-col bg-surface px-[15px] py-[17px]">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-display text-[18px] font-semibold leading-6 tracking-[-0.02em]">
            {project.title}
          </h3>
          <StatusPill tone={statusTone(project.status)} className="shrink-0">{project.status}</StatusPill>
        </div>
        <p className="mt-0.5 text-[13px] text-muted">{project.subtitle}</p>
        <p className={cn("mt-3 text-[12px] leading-5 text-muted", compact ? "line-clamp-3" : "line-clamp-2")}>
          {project.summary}
        </p>
        <div className="project-card__engineering mt-4">
          <p className="project-card__section-label">Engineering</p>
          <p className="mt-1 text-[12px] leading-5 text-muted">{project.engineering ?? project.approach}</p>
        </div>
        <div className="mt-4">
          <p className="project-card__section-label">Stack</p>
          <div className="mt-2 flex flex-wrap gap-2">
          {project.technologies.slice(0, 6).map((tech) => (
            <Badge
              key={tech}
              tone="muted"
              className="rounded-md border-0 px-2.5 py-1 text-[11px] font-medium"
            >
              {tech}
            </Badge>
          ))}
          </div>
        </div>
        <ProjectActions project={project} />
      </div>
    </Card>
  );
}

export function ProjectListRow({ project }: { project: Project }) {
  return (
    <Card hoverable className={cn("project-card project-card--list group flex flex-col overflow-hidden md:flex-row", project.visualStyle && `project-card--${project.visualStyle}`)}>
      <div className="project-card__visual relative min-h-44 overflow-hidden bg-surface-muted md:w-72">
        {project.imageUrl ? <Image src={project.imageUrl} alt={project.imageAlt ?? project.title} fill sizes="288px" className={cn("transition-transform duration-500 group-hover:scale-105", project.visualStyle === "research" ? "object-contain p-3" : "object-cover")} /> : <ProjectArchitecturePreview project={project} />}
        {project.visualLabel ? <span className="project-card__visual-label">{project.visualLabel}</span> : null}
      </div>
      <div className="flex flex-1 flex-col px-[18px] py-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold">{project.title}</h3>
            <p className="text-xs text-muted">{project.subtitle}</p>
          </div>
          <StatusPill tone={statusTone(project.status)} className="shrink-0">{project.status}</StatusPill>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted">{project.summary}</p>
        <p className="project-card__section-label mt-3">Engineering</p>
        <p className="mt-1 text-sm leading-6 text-muted">{project.engineering ?? project.approach}</p>
        <p className="project-card__section-label mt-3">Stack</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 6).map((technology) => <Badge key={technology} tone="muted">{technology}</Badge>)}
        </div>
        <ProjectActions project={project} />
      </div>
    </Card>
  );
}

export function ProjectArchitecturePreview({ project }: { project: Project }) {
  const architecture = project.caseStudy?.architecture;
  if (!architecture?.length) return null;

  return (
    <div
      className={cn("project-architecture-preview", project.visualStyle && `project-architecture-preview--${project.visualStyle}`)}
      role="img"
      aria-label={`${project.title} repository-derived architecture preview`}
    >
      {architecture.map((node, index) => (
        <div className="project-architecture-preview__node" key={node}>
          <span>0{index + 1}</span>
          <p>{node}</p>
        </div>
      ))}
    </div>
  );
}

function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5 text-[13px] font-semibold">
      <Link href={`/projects/${project.slug}`} className="inline-flex min-h-11 items-center gap-2 text-primary hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        View Case Study
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
      {project.repoUrl ? (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} on GitHub (opens in a new tab)`}
          className="inline-flex min-h-11 items-center gap-1.5 text-primary hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <GithubMark /> GitHub <ArrowUpRight className="size-3.5" />
        </a>
      ) : null}
      {project.liveUrl ? (
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1 text-primary hover:underline">
          Live Demo <ArrowUpRight className="size-3.5" />
        </a>
      ) : null}
    </div>
  );
}

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.64-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.4 9.4 0 0 1 12 6.97a9.4 9.4 0 0 1 2.5.34c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.89v2.8c0 .27.18.59.69.49A10.24 10.24 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
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
