import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { PageContainer } from "@/components/layout/page-header";
import { gallery } from "@/data/gallery";
import { profile } from "@/data/profile";

export const metadata = {
  title: "About",
  description: "Imani Gad is a Kennesaw State University computer science student focused on backend systems, cloud, applied AI, and security.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    label: "Systems",
    copy: "Understand interfaces, dependencies, and failure modes before adding complexity.",
  },
  {
    label: "Measurement",
    copy: "Use latency, reliability, throughput, tests, and operational outcomes to evaluate the work.",
  },
  {
    label: "Iteration",
    copy: "Build the smallest working path first, validate it, then improve the architecture where evidence justifies it.",
  },
];

const focusAreas = ["Backend Engineering", "Cloud Systems", "Applied AI", "Security Engineering"];
const personalInterests = ["Automotive", "Training", "Photography", "Soccer", "Aviation", "Hiking"];
const snapshots = gallery.filter((item) => ["ksu-deadlift", "track-mustang", "highway-sunset"].includes(item.id));
const milestones = [
  ["2021", "Started teaching Python"],
  ["2022", "Started CS at KSU"],
  ["2024", "First software engineering internship"],
  ["2025", "Backend / platform engineering"],
  ["2026", "Cybersecurity + expected graduation"],
];

export default function AboutPage() {
  return (
    <PageContainer width="wide">
      <section className="about-hero">
        <div className="about-hero__copy">
          <p className="eyebrow">Engineer / Builder / Student</p>
          <h1 className="about-hero__title">About</h1>
          <p>
            I&apos;m Imani Gad, a Computer Science student at Kennesaw State University graduating in December 2026. My experience spans backend development, enterprise platforms, cybersecurity operations, and applied AI. I&apos;m especially interested in systems that connect software, infrastructure, data, and real operational problems.
          </p>
          <div className="about-links">
            <a href={profile.resumePdf} download className="editorial-button"><Download className="size-4" /> View Résumé</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="editorial-text-link">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="editorial-text-link">LinkedIn ↗</a>
          </div>
        </div>
        <div className="about-hero__portrait">
          <Image
            src={profile.avatar}
            alt={`${profile.name}, professional portrait`}
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover object-[center_18%]"
          />
        </div>
      </section>

      <section className="editorial-section editorial-section--border">
        <div className="editorial-section__heading"><span>01 — How I build</span><span>Engineering practice</span></div>
        <div className="about-method">
          <p className="about-method__intro">
            I tend to start at the system boundary: what data comes in, what needs to happen to it, what can fail, and what another service or user expects back. From there I work toward an implementation that is observable, testable, and straightforward to maintain.
          </p>
          <div className="about-principles">
            {principles.map((principle, index) => (
              <article key={principle.label}>
                <span>0{index + 1}</span>
                <h2>{principle.label}</h2>
                <p>{principle.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-section--border">
        <div className="editorial-section__heading"><span>02 — Currently</span><span>Study / focus</span></div>
        <div className="about-current">
          <div>
            <p className="eyebrow">Education</p>
            <h2>{profile.education.school}</h2>
            <p>{profile.education.degreeShort}</p>
            <p>Expected {profile.education.end}</p>
          </div>
          <div>
            <p className="eyebrow">Focus</p>
            <ul>{focusAreas.map((focus) => <li key={focus}>{focus}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-section--border">
        <div className="editorial-section__heading"><span>03 — Beyond the terminal</span><span>Personal / outside work</span></div>
        <div className="about-life">
          <div>
            <h2 className="editorial-heading">Time away<br /><span className="font-serif italic text-violet">from the screen.</span></h2>
            <p>When I&apos;m not building software, I&apos;m usually training, working on cars, following aviation, playing soccer, hiking, or taking photos.</p>
            <div className="about-interests">{personalInterests.map((interest) => <span key={interest}>{interest}</span>)}</div>
          </div>
          <div className="about-snapshots">
            {snapshots.map((item) => (
              <Link key={item.id} href="/gallery" className="about-snapshot">
                <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 25vw, 80vw" className="object-cover" />
                <span>{item.title}<ArrowUpRight className="size-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-section--border">
        <div className="editorial-section__heading"><span>04 — Community</span><span>Groups and communities</span></div>
        <p className="about-community">IEEE Computer Society · SHPE · KSU AI Club · ColorStack</p>
      </section>

      <section className="editorial-section editorial-section--border">
        <div className="editorial-section__heading"><span>05 — Journey</span><span>Milestones</span></div>
        <div className="about-timeline">
          {milestones.map(([year, title]) => <div key={year}><span>{year}</span><p>{title}</p></div>)}
        </div>
      </section>
    </PageContainer>
  );
}
