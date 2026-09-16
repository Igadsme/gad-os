import { Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { profile } from "@/data/profile";

export const metadata = {
  title: "Contact",
  description: "Contact Imani Gad about software engineering internships, new-grad roles, and product collaborations.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Let’s build something useful."
        subtitle="I’m seeking software engineering internships and new-grad roles across backend, applied AI, and security. Based in Atlanta and graduating December 2026."
      />
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <a href={`mailto:${profile.email}`} className="flex items-center gap-3 rounded-lg border border-border p-4 text-sm hover:border-violet">
          <Mail className="size-4 text-violet" />
          <span><span className="block text-xs text-muted">Email</span>{profile.email}</span>
        </a>
        <a href={`tel:${profile.phone.replace(/\D/g, "")}`} className="flex items-center gap-3 rounded-lg border border-border p-4 text-sm hover:border-violet">
          <Phone className="size-4 text-violet" />
          <span><span className="block text-xs text-muted">Call</span>{profile.phone}</span>
        </a>
      </div>
      <ContactForm />
    </PageContainer>
  );
}
