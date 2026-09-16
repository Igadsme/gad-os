import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { Card, Badge } from "@/components/ui/card";
import { labExperiments } from "@/data/lab";

export const metadata = {
  title: "Now / Writing",
  description: "Current experiments and research notes from Imani Gad.",
};

export default function NowPage() {
  return (
    <PageContainer width="wide">
      <PageHeader
        kicker={<p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-violet">08 / NOW / WRITING</p>}
        title="Now / Writing"
        subtitle="Current experiments, research questions, and the systems I am actively thinking through."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {labExperiments.map((experiment) => (
          <Card key={experiment.slug} hoverable className="shine p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-violet">{experiment.stageLabel}</p>
                <h2 className="mt-2 font-display text-2xl font-bold uppercase">{experiment.title}</h2>
              </div>
              <Badge tone={experiment.status === "Completed" ? "green" : "violet"}>{experiment.status}</Badge>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{experiment.hypothesis}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {experiment.methods.map((method) => (
                <span key={method} className="rounded border border-border px-2 py-1 font-mono text-[10px] text-muted">{method}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <Link href="/projects" className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-violet hover:text-white">
        Explore project evidence <ArrowUpRight className="size-4" />
      </Link>
    </PageContainer>
  );
}
