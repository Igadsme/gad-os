"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";
import { profile } from "@/data/profile";

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
    try {
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
        toast.success("Message sent.");
        form.reset();
        return;
      }
      const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(`[Imani Gad] ${values.subject}`)}&body=${encodeURIComponent(values.message)}`;
      toast.message("Email delivery is not configured.", {
        description: "Use the email link to send this message directly.",
        action: { label: "Open email", onClick: () => { window.location.href = mailto; } },
      });
    } catch {
      toast.error("Could not send message. Please email me directly.");
    }
  }

  return (
    <Card className="contact-form-card p-5 sm:p-7">
      <h2 className="font-display text-lg font-semibold">Send a message</h2>
      <form className="mt-5 space-y-4" noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <Field label="Name" htmlFor="contact-name" error={form.formState.errors.name?.message}>
          <Input id="contact-name" autoComplete="name" required placeholder="Your name" aria-invalid={Boolean(form.formState.errors.name)} aria-describedby={form.formState.errors.name ? "contact-name-error" : undefined} {...form.register("name")} />
        </Field>
        <Field label="Email" htmlFor="contact-email" error={form.formState.errors.email?.message}>
          <Input id="contact-email" autoComplete="email" required placeholder="you@example.com" type="email" aria-invalid={Boolean(form.formState.errors.email)} aria-describedby={form.formState.errors.email ? "contact-email-error" : undefined} {...form.register("email")} />
        </Field>
        <Field label="Message" htmlFor="contact-message" error={form.formState.errors.message?.message}>
          <Textarea id="contact-message" required className="min-h-36" placeholder="Tell me about the opportunity or conversation…" aria-invalid={Boolean(form.formState.errors.message)} aria-describedby={form.formState.errors.message ? "contact-message-error" : undefined} {...form.register("message")} />
        </Field>
        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={form.formState.isSubmitting}>
          <Send /> {form.formState.isSubmitting ? "Sending…" : "Send message"}
        </Button>
      </form>
    </Card>
  );
}

function Field({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p id={`${htmlFor}-error`} role="alert" className="text-xs text-danger">{error}</p> : null}
    </div>
  );
}
