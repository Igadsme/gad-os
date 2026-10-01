import Link from "next/link";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { PageContainer } from "@/components/layout/page-header";
import { experience } from "@/data/experience";
import { getFeaturedProjects } from "@/data/projects";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";

const engineeringProfile = [
  {
    label: "Backend",
    details: "APIs · Microservices · Integrations · Data processing",
  },
  {
    label: "Cloud",
    details: "Azure · AWS · Containers · CI/CD · Telemetry",
  },
  {
    label: "Applied AI",
    details: "LLM APIs · RAG · Embeddings · Computer vision · Evaluation",
  },
  {
    label: "Security",
    details: "Microsoft Sentinel · KQL · CEF · Log Analytics · Palo Alto",
  },
];

const toolkitGroups = [
  { label: "Languages", prominence: true, ids: ["python", "typescript", "javascript", "java", "sql", "html", "css", "bash"] },
  { label: "Backend & APIs", prominence: true, ids: ["fastapi", "flask", "nodejs", "rest-api", "integration-hub", "prisma"] },
  { label: "Frontend", ids: ["react", "nextjs", "html", "css"] },
  { label: "Data", ids: ["postgresql", "redis", "mongodb", "mysql", "pinecone", "embeddings"] },
  { label: "Cloud & DevOps", prominence: true, ids: ["azure", "aws", "docker", "jenkins", "github"] },
  { label: "AI / ML", ids: ["pytorch", "tensorflow", "numpy", "pandas", "rag", "embeddings", "yolov8", "gemini-api", "openai-api", "pinecone"] },
  { label: "Security & Observability", ids: ["sentinel", "kql", "cef", "log-analytics", "palo-alto"] },
  { label: "Developer & Enterprise Tools", ids: ["git", "github", "jira", "servicenow", "integration-hub", "cypress", "cucumber", "tableau"] },
];

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <PageContainer width="wide">
      <section id="top" className="editorial-hero">
        <div className="aurora editorial-hero__aurora" />
        <div className="relative z-10">
          <p className="eyebrow">Imani Gad / Atlanta, Georgia</p>
          <p className="editorial-hero__role">Software Engineer · Backend · Cloud · Applied AI</p>
          <h1 className="editorial-hero__title">
            Software engineer<br />
            <span className="font-serif italic text-violet">building systems that ship.</span>
          </h1>
          <p className="editorial-hero__copy">
            I design and build software across backend systems, cloud infrastructure, applied AI, and security. My work spans APIs, enterprise integrations, developer tools, automation, and data pipelines.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#work" data-cursor="View" className="editorial-button">View my work <ArrowUpRight className="size-4" /></a>
            <a href={profile.resumePdf} download data-cursor="Download" className="editorial-text-link"><Download className="size-4" /> Résumé</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="editorial-text-link">GitHub ↗</a>
          </div>
        </div>
        <a href="#engineering-profile" className="editorial-scroll">Scroll <span>↓</span></a>
      </section>

      <section id="engineering-profile" className="editorial-section">
        <div className="editorial-section__heading"><span>01 — Engineering profile</span><span>Systems built across code, infrastructure, and operations</span></div>
        <div className="engineering-profile">
          {engineeringProfile.map((item, index) => (
            <div className="engineering-profile__row" key={item.label}>
              <span>0{index + 1}</span>
              <h2>{item.label}</h2>
              <p>{item.details}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="editorial-section editorial-section--border">
        <div className="editorial-section__heading"><span>02 — Selected work</span><span>Software, backend, applied AI, and security systems</span></div>
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
        <a href={profile.github} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-violet">More projects on GitHub <ArrowUpRight className="size-4" /></a>
      </section>

      <section id="experience" className="editorial-section editorial-section--border">
        <div className="editorial-section__heading"><span>03 — Professional experience</span><span>Backend services, enterprise platforms, applied AI, and security operations</span></div>
        <div className="editorial-experience">
          {experience.map((role, index) => <Link key={role.id} href={`/experience?role=${role.id}`} className="editorial-experience__row"><span>0{index + 1}</span><div><h3>{role.company}</h3><p>{role.role} · {role.start} — {role.end}</p></div><strong>{role.impact?.metric ?? role.summary}</strong></Link>)}
        </div>
        <Link href="/experience" className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-violet">Full experience <ArrowUpRight className="size-4" /></Link>
      </section>

      <section id="toolkit" className="editorial-section editorial-section--border">
        <div className="editorial-section__heading"><span>04 — Technical toolkit</span><span>Technologies grounded in project and experience work</span></div>
        <div className="technical-toolkit">
          {toolkitGroups.map((group) => {
            const names = group.ids
              .map((id) => skills.find((skill) => skill.id === id)?.name)
              .filter((name): name is string => Boolean(name));
            return (
              <div key={group.label} className={`technical-toolkit__row${group.prominence ? " technical-toolkit__row--prominent" : ""}`}>
                <h3>{group.label}</h3>
                <p>{[...new Set(names)].join(" · ")}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="about" className="editorial-section editorial-section--border">
        <div className="editorial-section__heading"><span>05 — About</span><span>Kennesaw State University · Atlanta, Georgia</span></div>
        <div className="editorial-about-preview">
          <h2>Software, infrastructure,<br /><span className="font-serif italic text-violet">and operational problems.</span></h2>
          <p>I’m a Computer Science student graduating in December 2026. My experience spans backend development, enterprise platforms, cybersecurity operations, and applied AI.</p>
          <Link href="/about" className="editorial-text-link">More about me <ArrowUpRight className="size-4" /></Link>
        </div>
      </section>

      <section id="contact" className="editorial-contact">
        <p className="eyebrow">06 — Contact</p>
        <h2>Let&apos;s talk<br /><span className="font-serif italic text-violet">engineering.</span></h2>
        <p>Interested in software engineering opportunities across backend, cloud, applied AI, or security.</p>
        <div className="mt-8 flex flex-wrap gap-5"><a href={`mailto:${profile.email}`} data-cursor="Email" className="editorial-button"><Mail className="size-4" /> Email me</a><a href={profile.linkedin} target="_blank" rel="noreferrer" className="editorial-text-link">LinkedIn ↗</a><a href={profile.github} target="_blank" rel="noreferrer" className="editorial-text-link">GitHub ↗</a></div>
      </section>

      <footer className="editorial-footer"><span>IG©26 — Imani Gad</span><span>Atlanta, Georgia</span><a href={profile.resumePdf} download className="editorial-text-link"><Download className="size-4" /> Download résumé</a></footer>
    </PageContainer>
  );
}
