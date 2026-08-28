import { ContactForm } from "@/components/contact/contact-form";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

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
        subtitle="I’m available for software engineering internships, new-grad roles, and thoughtful product collaborations."
      />
      <ContactForm />
    </PageContainer>
  );
}
