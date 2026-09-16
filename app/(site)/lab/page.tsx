import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { labExperiments } from "@/data/lab";

export const metadata = {
  title: "Lab",
  description: "Experiments and research directions from Imani Gad.",
};

export default function LabPage() {
  return (
    <PageContainer width="wide">
      <PageHeader
        kicker={<p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-violet">08 / LAB</p>}
        title="Engineering lab"
        subtitle="Working hypotheses and prototypes, clearly separated from completed résumé and project evidence."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {labExperiments.map((experiment) => (
          <Card key={experiment.slug} className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-violet">{experiment.status}</p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase">{experiment.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{experiment.hypothesis}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {experiment.methods.map((method) => <span key={method} className="rounded border border-border px-2 py-1 font-mono text-[10px] text-muted">{method}</span>)}
            </div>
          </Card>
        ))}
      </div>
      <Link href="/now" className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-violet hover:text-white">
        Read current notes <ArrowUpRight className="size-4" />
      </Link>
    </PageContainer>
  );
}
