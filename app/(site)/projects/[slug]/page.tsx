import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { Badge, Card } from "@/components/ui/card";
import { ProjectVisual } from "@/components/projects/project-visual";
import { PageContainer } from "@/components/layout/page-header";
import { StatusPill, statusTone } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const related = experience.find((role) => role.id === project.relatedExperienceId);

  return (
    <PageContainer width="narrow">
      <Link
        href="/projects"
        className="mb-4 inline-flex min-h-11 items-center gap-1 text-sm text-muted"
      >
        <ArrowLeft className="size-4" /> Projects
      </Link>
      <Card className="overflow-hidden">
        <div className="media-zoom">
          <ProjectVisual
            slug={project.slug}
            imageUrl={project.imageUrl}
            imageAlt={project.imageAlt}
            className="h-44"
          />
        </div>
        <div className="space-y-3 px-5 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="blue">{project.category}</Badge>
            <StatusPill tone={statusTone(project.status)}>{project.status}</StatusPill>
          </div>
          <h1 className="text-[32px] font-semibold tracking-tight">{project.title}</h1>
          <p className="text-sm text-muted">{project.subtitle}</p>
          <p className="text-xs text-muted">{project.timeframe}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge key={tech} tone="muted">
                {tech}
              </Badge>
            ))}
          </div>
          {project.liveUrl ? (
            <Button asChild size="sm">
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            </Button>
          ) : null}
          {project.repoUrl ? (
            <Button asChild size="sm" variant="secondary">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub (opens in a new tab)`}
              >
                View GitHub
              </a>
            </Button>
          ) : null}
        </div>
      </Card>
      <Card className="mt-4 space-y-4 px-5 py-5">
        <section>
          <h2 className="text-sm font-semibold">Problem</h2>
          <p className="mt-1.5 text-sm leading-6 text-muted">{project.problem}</p>
        </section>
        <section>
          <h2 className="text-sm font-semibold">Approach</h2>
          <p className="mt-1.5 text-sm leading-6 text-muted">{project.approach}</p>
        </section>
        <section>
          <h2 className="text-sm font-semibold">Outcome</h2>
          <p className="mt-1.5 text-sm leading-6 text-muted">{project.outcome}</p>
        </section>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted">
          {project.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        {related ? (
          <p className="text-sm">
            Related experience:{" "}
            <Link className="text-primary" href={`/experience?role=${related.id}`}>
              {related.role} · {related.company}
            </Link>
          </p>
        ) : null}
      </Card>
    </PageContainer>
  );
}
