import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge, Card } from "@/components/ui/card";
import { ProjectVisual } from "@/components/projects/project-visual";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <ProjectVisual slug={project.slug} className="h-36" />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold">{project.title}</h3>
            <p className="text-xs text-muted">{project.category}</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, compact ? 4 : 6).map((tech) => (
            <Badge key={tech} tone="muted">
              {tech}
            </Badge>
          ))}
        </div>
        {!compact && (
          <>
            <p className="mt-3 text-sm text-muted">{project.summary}</p>
            <p className="mt-2 flex items-start gap-2 text-sm">
              <Check className="mt-0.5 size-4 text-success" />
              {project.highlight}
            </p>
          </>
        )}
        {compact && (
          <p className="mt-3 line-clamp-2 text-sm text-muted">{project.subtitle}</p>
        )}
        <div className="mt-auto flex items-center gap-4 pt-4 text-sm">
          <Link href={`/projects/${project.slug}`} className="font-medium text-primary">
            Case Study →
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-muted hover:text-foreground"
            >
              Live Demo <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}

export function ProjectListRow({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col overflow-hidden md:flex-row">
      <ProjectVisual slug={project.slug} className="h-40 md:h-auto md:w-64" />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold">{project.title}</h3>
        <p className="text-xs text-muted">{project.category}</p>
        <p className="mt-2 text-sm text-muted">{project.summary}</p>
        <p className="mt-2 flex items-start gap-2 text-sm">
          <Check className="mt-0.5 size-4 text-success" />
          {project.highlight}
        </p>
        <Link href={`/projects/${project.slug}`} className="mt-3 text-sm text-primary">
          Case Study →
        </Link>
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
        "rounded-full border border-border px-3 py-1.5 text-sm text-muted",
        active && "border-primary/30 bg-primary text-white",
      )}
    >
      {children}
    </Link>
  );
}
