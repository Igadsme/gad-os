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
    toast.success("Message sent. I usually reply within 24–48 hours.");
    form.reset();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <div className="space-y-4">
        <Card className="p-4">
          <Badge tone="green">Available for roles</Badge>
          <p className="mt-3 text-sm text-muted">
            Graduating {profile.education.end}. Open to software engineering, AI/ML, and
            cybersecurity roles.
          </p>
        </Card>
        <Card className="p-4">
          <p className="flex items-center gap-2 font-medium">
            <MapPin className="size-4" /> Based in
          </p>
          <p className="mt-2 text-sm">{profile.locationFull}</p>
          <p className="text-sm text-muted">Open to local and remote opportunities.</p>
        </Card>
        <Card className="space-y-2 p-4 text-sm">
          <p className="font-medium">Quick links</p>
          <a className="block text-primary" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="block text-primary" href={profile.linkedin}>
            LinkedIn
          </a>
          <a className="block text-primary" href={profile.github}>
            GitHub
          </a>
        </Card>
      </div>
      <Card className="p-6">
        <h2 className="text-lg font-semibold">Send a Message</h2>
        <form className="mt-4 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Field label="Name" error={form.formState.errors.name?.message}>
            <Input placeholder="Your full name" {...form.register("name")} />
          </Field>
          <Field label="Email" error={form.formState.errors.email?.message}>
            <Input placeholder="your.email@example.com" type="email" {...form.register("email")} />
          </Field>
          <Field label="Company (optional)">
            <Input placeholder="Company" {...form.register("company")} />
          </Field>
          <Field label="Subject" error={form.formState.errors.subject?.message}>
            <select
              className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm"
              {...form.register("subject")}
            >
              {subjects.map((subject) => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </Field>
          <Field label="Message" error={form.formState.errors.message?.message}>
            <Textarea placeholder="What would you like to build?" {...form.register("message")} />
          </Field>
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            <Send /> Send Message
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
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
