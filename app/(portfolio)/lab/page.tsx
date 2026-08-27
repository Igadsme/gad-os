import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { labExperiments, labStatuses, type LabStatus } from "@/data/lab";
import { Badge, Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata = { title: "Lab" };

export default async function LabPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; experiment?: string }>;
}) {
  const params = await searchParams;
  const status = (labStatuses.includes(params.status as LabStatus | "All")
    ? params.status
    : "All") as LabStatus | "All";
  const visible =
    status === "All"
      ? labExperiments
      : labExperiments.filter((item) => item.status === status);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 text-sm text-muted">
            <FlaskConical className="size-4" /> The Lab
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">The Lab</h1>
          <p className="mt-2 text-muted">
            Research, experiments, and work in progress — grounded in résumé systems.
          </p>
        </div>
      </header>
      <div className="flex flex-wrap gap-2">
        {labStatuses.map((item) => (
          <Link
            key={item}
            href={item === "All" ? "/lab" : `/lab?status=${encodeURIComponent(item)}`}
            className={cn(
              "rounded-full border border-border px-3 py-1.5 text-sm text-muted",
              status === item && "border-primary/30 bg-primary text-white",
            )}
          >
            {item}
          </Link>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((experiment) => (
          <Card
            key={experiment.slug}
            id={experiment.slug}
            className={cn(
              "flex flex-col p-5",
              params.experiment === experiment.slug && "ring-2 ring-primary",
            )}
          >
            <div className="flex items-start justify-between">
              <h2 className="font-semibold">{experiment.title}</h2>
              <FlaskConical className="size-4 text-muted" />
            </div>
            <Badge
              className="mt-2 w-fit"
              tone={
                experiment.status === "Research"
                  ? "green"
                  : experiment.status === "Prototype"
                    ? "violet"
                    : "blue"
              }
            >
              {experiment.status}
            </Badge>
            <p className="mt-3 text-sm text-muted">
              <span className="font-medium text-foreground">Hypothesis. </span>
              {experiment.hypothesis}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {experiment.methods.map((method) => (
                <Badge key={method} tone="muted">
                  {method}
                </Badge>
              ))}
            </div>
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs text-muted">
                <span>Progress</span>
                <span>{experiment.progress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-muted">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${experiment.progress}%` }}
                />
              </div>
            </div>
            {experiment.relatedProjectSlug && (
              <Link
                href={`/projects/${experiment.relatedProjectSlug}`}
                className="mt-4 text-center text-sm text-primary"
              >
                Open Experiment →
              </Link>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
