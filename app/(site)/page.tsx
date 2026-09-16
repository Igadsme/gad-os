import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText, Mail } from "lucide-react";
import { PageContainer } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { profile, stats } from "@/data/profile";
import { getFeaturedProjects } from "@/data/projects";
import { experience } from "@/data/experience";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <PageContainer width="wide">
      <section className="grid-bg relative -mx-4 overflow-hidden border-b border-border px-4 py-20 md:-mx-0 md:px-12 md:py-28">
        <div className="aurora -right-24 -top-24" />
        <div className="relative z-10 max-w-3xl">
          <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-violet">{"// SOFTWARE ENGINEER · ATLANTA, GA"}</p>
          <h1 className="font-display text-[clamp(64px,12vw,150px)] font-black uppercase leading-[0.82] tracking-tight">
            Imani <span className="font-serif font-normal normal-case italic text-violet">Gad</span>
          </h1>
          <h2 className="mt-8 max-w-2xl font-display text-2xl font-semibold uppercase leading-tight tracking-[0.04em] text-muted sm:text-3xl">
            {profile.headline}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted/80">
            Computer Science candidate at {profile.education.school} building across backend engineering, enterprise automation, applied AI, and cybersecurity.
          </p>
          <p className="mt-4 max-w-xl border-l-2 border-violet pl-4 text-sm leading-6 text-foreground/80">
            Seeking software engineering internships and new-grad roles in backend, applied AI, or security. Based in Atlanta; graduating December 2026.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/projects" className="inline-flex h-11 items-center gap-2 rounded bg-violet px-5 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-background hover:bg-[#b39dff]">View featured work <ArrowRight className="size-4" /></Link>
            <a href={profile.resumePdf} download className="inline-flex h-11 items-center gap-2 rounded border border-border px-5 font-mono text-xs uppercase tracking-[0.1em] text-muted hover:border-violet hover:text-violet"><FileText className="size-4" /> Download résumé</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center rounded border border-border px-4 font-mono text-xs text-muted hover:border-violet hover:text-violet">GH</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center rounded border border-border px-4 font-mono text-xs text-muted hover:border-violet hover:text-violet">LI</a>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 border-b border-border lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className="relative border-r border-border px-5 py-6 last:border-r-0">
            <span className="absolute right-4 top-4 font-mono text-[9px] text-muted/50">0{index + 1}</span>
            <p className="font-display text-3xl font-bold">{stat.value}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="py-14">
        <div className="mb-6 flex items-end justify-between">
          <div><p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-violet">01 / SELECTED WORK</p><h2 className="font-display text-4xl font-bold uppercase">Featured projects</h2></div>
          <Link href="/projects" className="font-mono text-xs uppercase tracking-[0.1em] text-muted hover:text-violet">All projects →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group">
              <Card hoverable className="shine h-full overflow-hidden p-5">
                <p className="font-mono text-[10px] text-violet">{project.category}</p>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase">{project.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{project.summary}</p>
                <span className="mt-6 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-violet">Case study <ArrowUpRight className="size-3" /></span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-14">
        <div className="mb-6 flex items-end justify-between">
          <div><p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-violet">02 / EXPERIENCE</p><h2 className="font-display text-4xl font-bold uppercase">Recent roles</h2></div>
          <Link href="/experience" className="font-mono text-xs uppercase tracking-[0.1em] text-muted hover:text-violet">Full timeline →</Link>
        </div>
        <div className="grid border border-border md:grid-cols-3">
          {experience.slice(0, 3).map((role) => (
            <Link key={role.id} href={`/experience?role=${role.id}`} className="border-b border-border p-5 transition-colors hover:bg-white/[0.03] md:border-b-0 md:border-r md:last:border-r-0">
              <p className="font-mono text-[10px] text-violet">{role.start} – {role.end}</p>
              <h3 className="mt-3 font-display text-xl font-bold uppercase">{role.company}</h3>
              <p className="mt-1 text-sm text-muted">{role.role}</p>
              <p className="mt-5 text-sm leading-6 text-muted">{role.impact?.metric ?? role.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12 flex flex-col gap-5 border border-violet/30 bg-violet/10 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet">03 / OPEN CHANNEL</p><h2 className="mt-2 font-display text-3xl font-bold uppercase">Let’s build something useful.</h2><p className="mt-2 text-sm text-muted">{profile.availabilityFull}.</p></div>
        <div className="flex gap-3"><a href={`mailto:${profile.email}`} className="inline-flex h-11 items-center gap-2 rounded bg-violet px-4 font-mono text-xs font-semibold uppercase text-background"><Mail className="size-4" /> Email</a><Link href="/resume" className="inline-flex h-11 items-center gap-2 rounded border border-border px-4 font-mono text-xs uppercase text-muted"><FileText className="size-4" /> Résumé</Link></div>
      </section>
    </PageContainer>
  );
}
