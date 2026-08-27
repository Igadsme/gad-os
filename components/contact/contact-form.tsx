"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Lock, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";
import { profile } from "@/data/profile";
import { Badge } from "@/components/ui/card";

const subjects: ContactInput["subject"][] = [
  "Software engineering role",
  "AI/ML role",
  "Cybersecurity role",
  "Project collaboration",
  "Something else",
];

export function ContactForm() {
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "Software engineering role",
      message: "",
    },
  });

  async function onSubmit(values: ContactInput) {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = await response.json();
    if (!response.ok) {
      toast.error(json.error ?? "Could not send message.");
      return;
    }
    if (json.delivered) {
      toast.success("Message sent. I usually reply within 24–48 hours.");
      form.reset();
      return;
    }
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(`[Imani Gad] ${values.subject}`)}&body=${encodeURIComponent(values.message)}`;
    toast.message("Email delivery is not configured.", {
      description: "Use the email link to send this message directly.",
      action: {
        label: "Open email",
        onClick: () => {
          window.location.href = mailto;
        },
      },
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <div className="space-y-3">
        <Card className="p-4">
          <Badge tone="green">{profile.availability}</Badge>
          <p className="mt-3 text-sm leading-6 text-muted">
            Graduating {profile.education.end}. Open to software engineering, AI/ML, and
            cybersecurity roles.
          </p>
        </Card>
        <Card className="p-4">
          <p className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="size-4" /> Based in
          </p>
          <p className="mt-2 text-sm">{profile.locationFull}</p>
        </Card>
        <Card className="space-y-2 p-4 text-sm">
          <p className="font-medium">Quick links</p>
          <a className="block min-h-11 text-primary" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="block min-h-11 text-primary" href={profile.linkedin}>
            LinkedIn
          </a>
          <a className="block min-h-11 text-primary" href={profile.github}>
            GitHub
          </a>
        </Card>
      </div>
      <Card className="p-5">
        <h2 className="text-base font-semibold">Send a Message</h2>
        <form className="mt-4 space-y-4" noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <Field label="Name" htmlFor="contact-name" error={form.formState.errors.name?.message}>
            <Input id="contact-name" placeholder="Your full name" {...form.register("name")} />
          </Field>
          <Field label="Email" htmlFor="contact-email" error={form.formState.errors.email?.message}>
            <Input
              id="contact-email"
              placeholder="your.email@example.com"
              type="email"
              {...form.register("email")}
            />
          </Field>
          <Field label="Company (optional)" htmlFor="contact-company">
            <Input id="contact-company" placeholder="Company" {...form.register("company")} />
          </Field>
          <Field label="Subject" htmlFor="contact-subject" error={form.formState.errors.subject?.message}>
            <select
              id="contact-subject"
              className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm"
              {...form.register("subject")}
            >
              {subjects.map((subject) => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </Field>
          <Field label="Message" htmlFor="contact-message" error={form.formState.errors.message?.message}>
            <Textarea
              id="contact-message"
              placeholder="What would you like to build?"
              {...form.register("message")}
            />
          </Field>
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            <Send /> {form.formState.isSubmitting ? "Sending…" : "Send Message"}
          </Button>
          <p className="flex items-center justify-center gap-2 text-xs text-muted">
            <Lock className="size-3" />
            Usually responds within 24–48 hours. Your information is private.
          </p>
        </form>
      </Card>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </div>
  );
}
