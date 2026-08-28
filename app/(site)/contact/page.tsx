import { ContactForm } from "@/components/contact/contact-form";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Let’s build something useful."
        subtitle="I’m available for opportunities in software engineering, AI/ML, and cybersecurity."
      />
      <ContactForm />
    </PageContainer>
  );
}
