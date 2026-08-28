import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge, Card } from "@/components/ui/card";
import { ProjectVisual } from "@/components/projects/project-visual";
import { cn } from "@/lib/utils";

const cardSubtitles: Record<string, string> = {
  devdash: "Developer Productivity",
  "ai-security-camera-investigator": "AI · Computer Vision",
  "sentinel-ingestion": "Security Operations",
  "servicenow-itsm": "Workflow Automation",
  "headstarter-rag": "AI · Retrieval Systems",
  "upcancer-microservices": "Backend Infrastructure",
  "truespice-web": "Web Performance",
};

export function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <Card hoverable className="group flex h-full flex-col overflow-hidden rounded-[10px]">
      <ProjectVisual
        slug={project.slug}
        className={compact ? "aspect-[1.08/1] w-full border-b border-border" : "aspect-[1.12/1] w-full border-b border-border"}
      />
      <div className="flex flex-1 flex-col bg-surface px-[15px] py-[17px]">
        <h3 className="font-display text-[18px] font-semibold leading-6 tracking-[-0.02em]">
          {project.title}
        </h3>
        <p className="mt-0.5 text-[13px] text-muted">
          {cardSubtitles[project.slug] ?? project.category}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              tone="muted"
              className="rounded-md border-0 px-2.5 py-1 text-[11px] font-medium"
            >
              {tech}
            </Badge>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto inline-flex items-center gap-2 pt-5 text-[13px] font-semibold text-primary hover:underline"
        >
          Case Study
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Card>
  );
}

export function ProjectListRow({ project }: { project: Project }) {
  return (
    <Card hoverable className="flex flex-col overflow-hidden md:flex-row">
      <div className="media-zoom relative md:w-72">
        <ProjectVisual slug={project.slug} className="aspect-[1.12/1] w-full md:h-full md:aspect-auto" />
      </div>
      <div className="flex flex-1 flex-col px-[18px] py-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[15px] font-semibold">{project.title}</h3>
            <p className="text-xs text-muted">{project.category}</p>
          </div>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{project.summary}</p>
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
