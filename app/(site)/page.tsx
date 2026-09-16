import Link from "next/link";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { PageContainer } from "@/components/layout/page-header";
import { about } from "@/data/about";
import { experience } from "@/data/experience";
import { getFeaturedProjects } from "@/data/projects";
import { profile, stats } from "@/data/profile";
import { skillFocusGroups, skills } from "@/data/skills";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const prioritySkillIds = new Set([
    "python", "typescript", "javascript", "sql", "react", "nextjs", "fastapi",
    "nodejs", "postgresql", "redis", "docker", "git", "sentinel", "kql",
    "azure", "rest-api", "servicenow", "integration-hub",
  ]);

  return (
    <PageContainer width="wide">
      <section id="top" className="editorial-hero">
        <div className="aurora editorial-hero__aurora" />
        <div className="relative z-10">
          <p className="eyebrow">Portfolio ©26 / Atlanta, Georgia</p>
          <p className="editorial-hero__role">Software Engineer <span>/</span> Atlanta — KSU ’26</p>
          <h1 className="editorial-hero__title">
            I build software<br />
            <span className="font-serif italic text-violet">people trust.</span>
          </h1>
          <p className="editorial-hero__copy">
            {profile.headline} I work across backend systems, applied AI, enterprise automation, and cybersecurity with a bias toward useful, measurable outcomes.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#work" data-cursor="View" className="editorial-button">View my work <ArrowUpRight className="size-4" /></a>
            <Link href="/about" data-cursor="Open" className="editorial-text-link">Who I am <span>↗</span></Link>
          </div>
        </div>
        <div className="editorial-hero__meta">
          {stats.slice(0, 3).map((stat) => (
            <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
          ))}
          <div><strong className="text-success">OPEN</strong><span>to work · Dec 2026</span></div>
        </div>
        <a href="#about" className="editorial-scroll">Scroll <span>↓</span></a>
      </section>

      <div className="editorial-marquee" aria-hidden="true">
        <div>AVAILABLE FOR WORK <span>✦</span> ATLANTA-BASED <span>✦</span> AI / BACKEND / SECURITY <span>✦</span> SOFTWARE ENGINEER <span>✦</span> AVAILABLE FOR WORK <span>✦</span> ATLANTA-BASED <span>✦</span></div>
      </div>

      <section id="about" className="editorial-section">
        <div className="editorial-section__heading"><span>01 — About</span><span>First-generation / Rwanda → Atlanta</span></div>
        <div className="editorial-two-col">
          <div>
            <p className="eyebrow">The standard</p>
            <h2 className="editorial-heading">Build it clearly.<br /><span className="font-serif italic text-violet">Make it useful.</span></h2>
          </div>
          <div>
            <p className="editorial-lede">{about.bio}</p>
            <div className="editorial-principles">
              {about.values.map((value, index) => (
                <div key={value.title}><span>0{index + 1}</span><div><h3>{value.title}</h3><p>{value.body}</p></div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="stack" className="editorial-section editorial-section--border">
        <div className="editorial-section__heading"><span>02 — The stack</span><span>Chosen for shipping — not trend cycles</span></div>
        <div className="editorial-stack">
          {skillFocusGroups.slice(0, 3).map((group, index) => {
            const groupSkills = skills.filter((skill) => group.skillIds.includes(skill.id) && prioritySkillIds.has(skill.id));
            return <div key={group.id} className="editorial-stack__group"><span className="editorial-stack__letter">{String.fromCharCode(65 + index)}</span><h3>{group.label}</h3><p>{index === 0 ? "The languages I use to reason, model, and ship." : index === 1 ? "The machinery behind products — data, APIs, and interfaces." : "The systems that get software into production and keep it reliable."}</p><div>{groupSkills.map((skill) => <span key={skill.id}>{skill.name}</span>)}</div></div>;
          })}
        </div>
      </section>

      <section id="work" className="editorial-section editorial-section--border">
        <div className="editorial-section__heading"><span>03 — Selected work</span><span>Projects with a problem, approach, and result</span></div>
        <div className="editorial-work-list">
          {featured.map((project, index) => (
            <article key={project.slug} className="editorial-project">
              <div className="editorial-project__number">0{index + 1}</div>
              <div className="editorial-project__visual" style={project.imageUrl ? { backgroundImage: `url(${project.imageUrl})` } : undefined} />
              <div className="editorial-project__body">
                <p className="eyebrow">{project.subtitle} · {project.status}</p>
                <h2>{project.title}</h2>
                <p className="editorial-project__summary">{project.summary}</p>
                <div className="editorial-project__facts"><div><span>Problem</span><p>{project.problem}</p></div><div><span>Result</span><p>{project.highlight}</p></div></div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {project.technologies.slice(0, 5).map((technology) => <span key={technology} className="editorial-tag">{technology}</span>)}
                </div>
                <div className="mt-6 flex gap-5"><Link href={`/projects/${project.slug}`} data-cursor="Open" className="editorial-text-link">Case study <ArrowUpRight className="size-4" /></Link>{project.repoUrl ? <a href={project.repoUrl} target="_blank" rel="noreferrer" data-cursor="Visit" className="editorial-text-link">GitHub ↗</a> : null}</div>
              </div>
            </article>
          ))}
        </div>
        <a href={profile.github} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-violet">More experiments on GitHub <ArrowUpRight className="size-4" /></a>
      </section>

      <section id="experience" className="editorial-section editorial-section--border">
        <div className="editorial-section__heading"><span>04 — Experience</span><span>Systems, outcomes, and proof</span></div>
        <div className="editorial-experience">
          {experience.map((role, index) => <div key={role.id} className="editorial-experience__row"><span>0{index + 1}</span><div><h3>{role.company}</h3><p>{role.role} · {role.start} — {role.end}</p></div><strong>{role.impact?.metric ?? role.summary}</strong></div>)}
        </div>
      </section>

      <section id="journey" className="editorial-section editorial-section--border">
        <div className="editorial-section__heading"><span>05 — The journey</span><span>Curiosity → systems → shipping</span></div>
        <div className="editorial-journey">
          {about.journey.map((item, index) => <div key={item.year} className="editorial-journey__item"><span>0{index + 1} / {item.year}</span><h3>{item.title}</h3><p>{item.detail}</p></div>)}
        </div>
      </section>

      <section id="contact" className="editorial-contact">
        <p className="eyebrow">06 — Contact</p>
        <h2>Let&apos;s build something<br /><span className="font-serif italic text-violet">useful.</span></h2>
        <p>Have a role, a project, or a good problem worth solving? I&apos;d like to hear about it.</p>
        <div className="mt-8 flex flex-wrap gap-5"><a href={`mailto:${profile.email}`} data-cursor="Email" className="editorial-button"><Mail className="size-4" /> Email me</a><a href={profile.github} target="_blank" rel="noreferrer" className="editorial-text-link">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer" className="editorial-text-link">LinkedIn ↗</a></div>
      </section>

      <footer className="editorial-footer"><span>IG©26 — Imani Gad</span><span>Built by hand · Atlanta, Georgia</span><a href={profile.resumePdf} download className="editorial-text-link"><Download className="size-4" /> Open full résumé</a></footer>
    </PageContainer>
  );
}
