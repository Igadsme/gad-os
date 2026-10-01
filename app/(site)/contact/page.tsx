import { ArrowUpRight, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { profile } from "@/data/profile";

export const metadata = {
  title: "Contact",
  description: "Contact Imani Gad about software engineering opportunities in backend systems, cloud, applied AI, and security.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageContainer>
      <PageHeader
        kicker={<p className="eyebrow">Contact / Atlanta, Georgia</p>}
        title="Let’s talk."
        subtitle="I’m interested in software engineering opportunities and conversations around backend systems, cloud infrastructure, applied AI, and security."
      />
      <div className="contact-layout">
        <aside className="contact-details">
          <a href={`mailto:${profile.email}`} className="contact-email"><Mail className="size-4 text-violet" /><span>Email me</span><span>{profile.email}</span></a>
          <div className="contact-socials">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight className="size-4" /></a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight className="size-4" /></a>
          </div>
          <div className="contact-open-to">
            <p className="eyebrow">Open to</p>
            <ul>
              <li>Software Engineering</li>
              <li>Backend Engineering</li>
              <li>Cloud / Platform Engineering</li>
              <li>Applied AI</li>
              <li>Security Engineering</li>
            </ul>
          </div>
        </aside>
        <ContactForm />
      </div>
    </PageContainer>
  );
}
