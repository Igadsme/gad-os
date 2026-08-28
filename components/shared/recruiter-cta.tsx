import Link from "next/link";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function RecruiterCta({ className }: { className?: string }) {
  return (
    <Card className={cn("flex flex-col gap-4 border-primary/15 bg-primary-soft/35 p-5 sm:flex-row sm:items-center sm:justify-between", className)}>
      <div>
        <h2 className="font-display text-xl font-semibold">Let’s build something useful.</h2>
        <p className="mt-1 max-w-xl text-sm leading-6 text-muted">
          Open to software engineering internships and new-grad opportunities.
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">
        <Button asChild size="sm"><a href={`mailto:${profile.email}`}><Mail /> Email</a></Button>
        <Button asChild variant="secondary" size="sm"><Link href="/resume"><FileText /> Résumé</Link></Button>
        <Button asChild variant="ghost" size="sm"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a></Button>
        <Button asChild variant="ghost" size="sm"><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a></Button>
      </div>
    </Card>
  );
}
