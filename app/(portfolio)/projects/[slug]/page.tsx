import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { Badge, Card } from "@/components/ui/card";
import { ProjectVisual } from "@/components/projects/project-visual";

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
    <article className="mx-auto max-w-3xl space-y-6">
      <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-muted">
        <ArrowLeft className="size-4" /> Projects
      </Link>
      <Card className="overflow-hidden">
        <ProjectVisual slug={project.slug} className="h-48" />
        <div className="space-y-4 p-6">
          <Badge tone="blue">{project.category}</Badge>
          <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
          <p className="text-muted">{project.subtitle}</p>
          <p className="text-sm text-muted">{project.timeframe}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} tone="muted">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
      <Card className="space-y-4 p-6">
        <section>
          <h2 className="font-semibold">Problem</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{project.problem}</p>
        </section>
        <section>
          <h2 className="font-semibold">Approach</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{project.approach}</p>
        </section>
        <section>
          <h2 className="font-semibold">Outcome</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{project.outcome}</p>
        </section>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
          {project.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        {related && (
          <p className="text-sm">
            Related experience:{" "}
            <Link className="text-primary" href={`/experience?role=${related.id}`}>
              {related.role} · {related.company}
            </Link>
          </p>
        )}
      </Card>
    </article>
  );
}
