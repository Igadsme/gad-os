import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/page-header";
import { StatusPill, statusTone } from "@/components/ui/status-pill";

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
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study`,
      description: project.summary,
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
  const caseStudy = project.caseStudy;

  return (
    <PageContainer width="default">
      <Link
        href="/projects"
        className="mb-4 inline-flex min-h-11 items-center gap-1 text-sm text-muted"
      >
        <ArrowLeft className="size-4" /> Projects
      </Link>
      <Card className={`project-case project-case--${project.visualStyle ?? "default"} overflow-hidden`}>
        <div className="relative min-h-56 overflow-hidden border-b border-border bg-surface-muted sm:min-h-72">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.imageAlt ?? project.title}
              fill
              sizes="(min-width: 768px) 900px, 100vw"
              className={project.visualStyle === "research" ? "object-contain p-4" : "object-cover"}
            />
          ) : null}
        </div>
        <div className="space-y-3 px-5 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-[0.1em] text-muted">{project.subtitle}</span>
            <StatusPill tone={statusTone(project.status)}>{project.status}</StatusPill>
          </div>
          <h1 className="max-w-4xl font-display text-[32px] font-semibold tracking-[-0.035em] sm:text-5xl">{project.title}</h1>
          <p className="max-w-3xl text-base leading-7 text-muted">{project.summary}</p>
        </div>
      </Card>

      <Card className="mt-5 space-y-8 px-5 py-6 sm:px-7">
        <CaseSection title="Overview" body={caseStudy?.overview ?? project.summary} />
        <CaseSection title="Problem" body={project.problem} />
        {caseStudy ? (
          <section>
            <h2 className="font-display text-xl font-semibold">Architecture</h2>
            <ol className={`architecture-diagram architecture-diagram--${project.visualStyle ?? "default"} mt-4`} aria-label={`${project.title} architecture flow`}>
              {caseStudy.architecture.map((node, index) => (
                <li className="architecture-diagram__step" key={node}>
                  <div className="architecture-diagram__node">
                    <span>0{index + 1}</span>
                    <p>{node}</p>
                  </div>
                  {index < caseStudy.architecture.length - 1 ? (
                    <ArrowRight className="architecture-diagram__arrow" aria-hidden="true" />
                  ) : null}
                </li>
              ))}
            </ol>
            {caseStudy.architectureCaption ? (
              <p className="mt-3 text-xs leading-5 text-muted">{caseStudy.architectureCaption}</p>
            ) : null}
          </section>
        ) : (
          <CaseSection title="Architecture" body="An architecture diagram is not included because implementation details are not documented in the portfolio data." />
        )}
        <CaseList title="What I Built" items={caseStudy?.whatBuilt ?? project.bullets} />
        <CaseSection title="Technical Challenges" body={caseStudy?.challenge ?? project.problem} />
        <section>
          <h2 className="font-display text-xl font-semibold">Stack</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span className="editorial-tag" key={technology}>{technology}</span>
            ))}
          </div>
        </section>
        <CaseList
          title="Validation / Testing"
          items={caseStudy?.testing ?? ["Project-specific validation details are not documented in the portfolio data."]}
        />
        <section>
          <h2 className="font-display text-xl font-semibold">Current Status</h2>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <StatusPill tone={statusTone(project.status)}>{project.status}</StatusPill>
            <p className="text-sm leading-6 text-muted">{caseStudy?.currentStatus ?? project.statusDetail ?? project.status}</p>
          </div>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold">GitHub / Demo</h2>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            {project.repoUrl ? (
              <a className="editorial-text-link" href={project.repoUrl} target="_blank" rel="noreferrer">
                GitHub <ArrowRight className="size-4" />
              </a>
            ) : null}
            {project.liveUrl ? (
              <a className="editorial-text-link" href={project.liveUrl} target="_blank" rel="noreferrer">
                Live Demo <ArrowRight className="size-4" />
              </a>
            ) : null}
          </div>
        </section>
      </Card>
    </PageContainer>
  );
}

function CaseSection({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">{body}</p>
    </section>
  );
}

function CaseList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}
