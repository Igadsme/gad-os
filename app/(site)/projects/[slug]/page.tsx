import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { Badge, Card } from "@/components/ui/card";
import { ProjectVisual } from "@/components/projects/project-visual";
import { PageContainer } from "@/components/layout/page-header";
import { StatusPill, statusTone } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { RecruiterCta } from "@/components/shared/recruiter-cta";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  const canonical = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical },
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.summary,
      url: canonical,
      type: "article",
      images: project.imageUrl ? [{ url: project.imageUrl, alt: project.imageAlt ?? project.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study`,
      description: project.summary,
      images: project.imageUrl ? [project.imageUrl] : undefined,
    },
  };
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
    <PageContainer width="default">
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
            className="aspect-[16/9] max-h-[560px] w-full"
          />
        </div>
        <div className="space-y-3 px-5 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="blue">{project.category}</Badge>
            <StatusPill tone={statusTone(project.status)}>{project.status}</StatusPill>
          </div>
          <h1 className="max-w-4xl font-display text-[32px] font-semibold tracking-[-0.035em] sm:text-5xl">{project.title}</h1>
          <p className="max-w-3xl text-base leading-7 text-muted">{project.summary}</p>
          <p className="text-xs text-muted">{project.timeframe}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
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
      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Card className="space-y-8 px-5 py-6 sm:px-7">
          <CaseSection title="Overview" body={project.caseStudy?.overview ?? project.summary} />
          <CaseSection title="Problem" body={project.problem} />
          <CaseSection title="Solution" body={project.caseStudy?.solution ?? project.approach} />

          {project.caseStudy ? (
            <section>
              <h2 className="font-display text-xl font-semibold">Architecture</h2>
              <ol className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {project.caseStudy.architecture.map((node, index) => (
                  <li key={node} className="relative rounded-xl border border-border bg-surface-muted p-3 text-sm font-medium">
                    <span className="mb-2 block font-mono text-[10px] text-primary">0{index + 1}</span>
                    {node}
                    {index < project.caseStudy!.architecture.length - 1 ? <ArrowRight className="absolute -right-2.5 top-1/2 hidden size-4 -translate-y-1/2 rounded-full bg-surface text-primary xl:block" /> : null}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {project.caseStudy ? <CaseList title="Technical decisions" items={project.caseStudy.decisions} /> : null}
          <CaseSection title="Biggest challenge" body={project.caseStudy?.challenge ?? project.problem} />
          <CaseList title="Results and impact" items={project.caseStudy?.results ?? project.bullets} />
          <p className="rounded-xl border border-border bg-surface-muted px-4 py-3 text-xs leading-5 text-muted">
            <span className="font-semibold text-foreground">Metric context: </span>{project.metricContext}
          </p>
          {project.caseStudy ? <CaseList title="Testing" items={project.caseStudy.testing} /> : null}
          <CaseSection title="Reflection" body={project.caseStudy?.reflection ?? project.outcome} />
        </Card>

        <aside className="space-y-4 lg:sticky lg:top-5 lg:self-start">
          <Card className="p-4">
            <h2 className="font-display text-base font-semibold">My role</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{project.caseStudy?.role ?? "Software engineer"}</p>
          </Card>
          <Card className="p-4">
            <h2 className="font-display text-base font-semibold">Project facts</h2>
            <dl className="mt-3 space-y-3 text-sm">
              <div><dt className="text-xs text-muted">Status</dt><dd className="mt-0.5 font-medium">{project.status}</dd></div>
              <div><dt className="text-xs text-muted">Timeframe</dt><dd className="mt-0.5 font-medium">{project.timeframe}</dd></div>
              {project.visualMetrics.map((metric) => <div key={metric.label}><dt className="text-xs text-muted">{metric.label}</dt><dd className="mt-0.5 font-medium">{metric.value}</dd></div>)}
            </dl>
          </Card>
        </aside>
      </div>

      <RecruiterCta className="mt-5" />

      {related ? (
        <Card className="mt-5 space-y-4 px-5 py-5">
          <p className="text-sm">
            Related experience:{" "}
            <Link className="text-primary" href={`/experience?role=${related.id}`}>
              {related.role} · {related.company}
            </Link>
          </p>
        </Card>
      ) : null}
    </PageContainer>
  );
}

function CaseSection({ title, body }: { title: string; body: string }) {
  return <section><h2 className="font-display text-xl font-semibold">{title}</h2><p className="mt-2 max-w-3xl text-sm leading-7 text-muted">{body}</p></section>;
}

function CaseList({ title, items }: { title: string; items: readonly string[] }) {
  return <section><h2 className="font-display text-xl font-semibold">{title}</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">{items.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}
