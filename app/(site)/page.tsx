import Link from "next/link";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { PageContainer } from "@/components/layout/page-header";
import { about } from "@/data/about";
import { experience } from "@/data/experience";
import { getFeaturedProjects } from "@/data/projects";
import { profile, stats } from "@/data/profile";
import { skills } from "@/data/skills";

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
          <p className="eyebrow">Imani Gad / Atlanta, Georgia</p>
          <p className="editorial-hero__role">Software Engineer <span>/</span> Kennesaw State University — December 2026</p>
          <h1 className="editorial-hero__title">
            I build AI-powered<br />
            <span className="font-serif italic text-violet">software systems.</span>
          </h1>
          <p className="editorial-hero__copy">
            {profile.headline} I’m focused on software engineering, backend systems, applied AI, cloud automation, and cybersecurity.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#work" data-cursor="View" className="editorial-button">View my work <ArrowUpRight className="size-4" /></a>
            <Link href="/about" data-cursor="Open" className="editorial-text-link">About me <span>↗</span></Link>
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
        <div>OPEN TO SOFTWARE ENGINEERING ROLES <span>✦</span> ATLANTA-BASED <span>✦</span> GRADUATING DECEMBER 2026 <span>✦</span> AI / BACKEND / CLOUD / SECURITY <span>✦</span> OPEN TO SOFTWARE ENGINEERING ROLES <span>✦</span></div>
      </div>

      <section id="about" className="editorial-section">
        <div className="editorial-section__heading"><span>01 — About</span><span>First-generation / Rwanda → United States, 2018</span></div>
        <div className="editorial-two-col">
          <div>
            <p className="eyebrow">How I work</p>
            <h2 className="editorial-heading">Software for<br /><span className="font-serif italic text-violet">real problems.</span></h2>
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
        <div className="editorial-section__heading"><span>02 — Technical stack</span><span>Tools used across products, platforms, and security systems</span></div>
        <div className="editorial-stack">
          {[
            { id: "languages", label: "Languages", description: "Core languages used across backend, frontend, data, and automation work.", ids: ["python", "typescript", "javascript", "sql"] },
            { id: "systems", label: "Backend, AI & APIs", description: "The machinery behind products — services, data, APIs, and applied AI.", ids: ["fastapi", "nodejs", "postgresql", "redis", "rest-api", "react", "nextjs"] },
            { id: "platforms", label: "Cloud, DevOps & Security", description: "The systems used to ship, operate, and secure software in production.", ids: ["docker", "git", "sentinel", "kql", "azure", "servicenow", "integration-hub"] },
          ].map((group, index) => {
            const groupSkills = skills.filter((skill) => group.ids.includes(skill.id) && prioritySkillIds.has(skill.id));
            return <div key={group.id} className="editorial-stack__group"><span className="editorial-stack__letter">{String.fromCharCode(65 + index)}</span><h3>{group.label}</h3><p>{group.description}</p><div>{groupSkills.map((skill) => <span key={skill.id}>{skill.name}</span>)}</div></div>;
          })}
        </div>
      </section>

      <section id="work" className="editorial-section editorial-section--border">
        <div className="editorial-section__heading"><span>03 — Selected work</span><span>AI, backend, full-stack, and cybersecurity projects</span></div>
        <div className="editorial-work-list">
          {featured.map((project, index) => (
            <article key={project.slug} className="editorial-project">
              <div className="editorial-project__number">0{index + 1}</div>
              <div className="editorial-project__visual editorial-project__visual--empty">
                <span>{project.category}</span>
                <strong>{project.status}</strong>
              </div>
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
        <div className="editorial-section__heading"><span>04 — Experience</span><span>Internships, co-op, fellowship, and teaching</span></div>
        <div className="editorial-experience">
          {experience.map((role, index) => <div key={role.id} className="editorial-experience__row"><span>0{index + 1}</span><div><h3>{role.company}</h3><p>{role.role} · {role.start} — {role.end}</p></div><strong>{role.impact?.metric ?? role.summary}</strong></div>)}
        </div>
      </section>

      <section id="journey" className="editorial-section editorial-section--border">
        <div className="editorial-section__heading"><span>05 — The journey</span><span>Rwanda → Atlanta → software engineering</span></div>
        <div className="editorial-journey">
          {about.journey.map((item, index) => <div key={item.year} className="editorial-journey__item"><span>0{index + 1} / {item.year}</span><h3>{item.title}</h3><p>{item.detail}</p></div>)}
        </div>
      </section>

      <section id="contact" className="editorial-contact">
        <p className="eyebrow">06 — Contact</p>
        <h2>Let&apos;s build something<br /><span className="font-serif italic text-violet">useful.</span></h2>
        <p>Seeking software engineering, backend, full-stack, AI/ML, cloud, ServiceNow, cybersecurity, and SDET opportunities.</p>
        <div className="mt-8 flex flex-wrap gap-5"><a href={`mailto:${profile.email}`} data-cursor="Email" className="editorial-button"><Mail className="size-4" /> Email me</a><a href={profile.github} target="_blank" rel="noreferrer" className="editorial-text-link">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer" className="editorial-text-link">LinkedIn ↗</a></div>
      </section>

      <footer className="editorial-footer"><span>IG©26 — Imani Gad</span><span>Built by hand · Atlanta, Georgia</span><a href={profile.resumePdf} download className="editorial-text-link"><Download className="size-4" /> Open full résumé</a></footer>
    </PageContainer>
  );
}
