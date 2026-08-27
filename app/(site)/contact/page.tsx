import { ContactForm } from "@/components/contact/contact-form";
import { profile } from "@/data/profile";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Let’s build something useful."
        subtitle={`Available for opportunities in software engineering, AI/ML, and cybersecurity. ${profile.education.school} · ${profile.education.end}.`}
      />
      <ContactForm />
    </PageContainer>
  );
}
