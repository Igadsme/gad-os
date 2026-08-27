import { ContactForm } from "@/components/contact/contact-form";
import { profile } from "@/data/profile";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Let’s build something useful.
        </h1>
        <p className="mt-2 text-muted">
          I’m available for opportunities in software engineering, AI/ML, and
          cybersecurity. {profile.education.school} · {profile.education.end}.
        </p>
      </header>
      <ContactForm />
    </div>
  );
}
