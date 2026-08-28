"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Lock,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, Card } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";
import { profile } from "@/data/profile";

const subjects: ContactInput["subject"][] = [
  "Software engineering role",
  "AI/ML role",
  "Cybersecurity role",
  "Project collaboration",
  "Something else",
];

type AvailabilityResponse = { connected: boolean; busyDates: string[] };

function monthGrid(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysInPreviousMonth = new Date(year, month - 1, 0).getDate();

  return Array.from({ length: 42 }, (_, index) => {
    const relativeDay = index - firstDay + 1;
    if (relativeDay < 1) return { day: daysInPreviousMonth + relativeDay, muted: true };
    if (relativeDay > daysInMonth) return { day: relativeDay - daysInMonth, muted: true };
    return { day: relativeDay, muted: false };
  });
}

function dateKey(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function ContactForm() {
  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });
  const [calendarStatus, setCalendarStatus] = useState<"loading" | "connected" | "disconnected" | "error">("loading");
  const [busyDates, setBusyDates] = useState<string[]>([]);
  const calendarDays = useMemo(() => monthGrid(visibleMonth.year, visibleMonth.month), [visibleMonth]);
  const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
    new Date(visibleMonth.year, visibleMonth.month - 1, 1),
  );

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/calendar/availability?year=${visibleMonth.year}&month=${visibleMonth.month}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Calendar unavailable");
        return response.json() as Promise<AvailabilityResponse>;
      })
      .then((data) => {
        setBusyDates(data.busyDates);
        setCalendarStatus(data.connected ? "connected" : "disconnected");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setBusyDates([]);
        setCalendarStatus("error");
      });
    return () => controller.abort();
  }, [visibleMonth]);

  function moveMonth(direction: -1 | 1) {
    setCalendarStatus("loading");
    setVisibleMonth((current) => {
      const next = new Date(current.year, current.month - 1 + direction, 1);
      return { year: next.getFullYear(), month: next.getMonth() + 1 };
    });
  }

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
      action: { label: "Open email", onClick: () => { window.location.href = mailto; } },
    });
  }

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <Card className="p-4">
          <h2 className="font-display text-base font-semibold">Availability</h2>
          <Badge tone="green" className="mt-2">Available for roles</Badge>
          <p className="mt-2 flex items-center gap-1.5 text-[10px] text-muted">
            <span className={`size-1.5 rounded-full ${calendarStatus === "connected" ? "bg-success" : calendarStatus === "error" ? "bg-danger" : "bg-slate-300"}`} />
            {calendarStatus === "connected" && "Synced with Outlook"}
            {calendarStatus === "loading" && "Checking Outlook…"}
            {calendarStatus === "disconnected" && "Outlook connection needed"}
            {calendarStatus === "error" && "Outlook is temporarily unavailable"}
          </p>

          <div className="mt-4 rounded-xl border border-border bg-surface p-3">
            <div className="flex items-center justify-between">
              <button type="button" aria-label="Previous month" onClick={() => moveMonth(-1)} className="grid size-7 place-items-center rounded-lg text-muted hover:bg-surface-muted hover:text-foreground">
                <ChevronLeft className="size-4" />
              </button>
              <p className="text-xs font-semibold">{monthLabel}</p>
              <button type="button" aria-label="Next month" onClick={() => moveMonth(1)} className="grid size-7 place-items-center rounded-lg text-muted hover:bg-surface-muted hover:text-foreground">
                <ChevronRight className="size-4" />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-7 text-center text-[9px] font-semibold text-muted">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <span key={`${day}-${index}`}>{day}</span>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-[10px]">
              {calendarDays.map((date, index) => (
                <span
                  key={`${date.day}-${index}`}
                  className={`relative mx-auto grid size-6 place-items-center rounded-full ${
                    !date.muted && date.day === today.getDate() && visibleMonth.month === today.getMonth() + 1 && visibleMonth.year === today.getFullYear()
                      ? "bg-primary font-semibold text-white"
                      : date.muted ? "text-slate-300" : "text-foreground"
                  }`}
                >
                  {date.day}
                  {!date.muted && calendarStatus === "connected" ? (
                    <span className={`absolute bottom-0 size-1 rounded-full ${busyDates.includes(dateKey(visibleMonth.year, visibleMonth.month, date.day)) ? "bg-amber-400" : "bg-success"}`} />
                  ) : null}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-[10px] leading-4 text-muted">
            <Lock className="size-3" /> Event names and details stay private.
          </p>
        </Card>

        <Card className="p-4">
          <h2 className="font-display text-base font-semibold">Based in</h2>
          <p className="mt-3 flex items-center gap-2 text-sm font-medium">
            <MapPin className="size-4 text-primary" /> {profile.locationFull}
          </p>
          <p className="mt-2 text-xs leading-5 text-muted">Open to local and remote opportunities.</p>
        </Card>

        <Card className="p-4">
          <h2 className="font-display text-base font-semibold">Quick Links</h2>
          <div className="mt-3 space-y-3">
            <QuickLink icon={<Mail />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <QuickLink icon={<span className="font-bold">in</span>} label="LinkedIn" value={profile.linkedinHandle} href={profile.linkedin} />
            <QuickLink icon={<span className="font-bold">GH</span>} label="GitHub" value={profile.githubHandle} href={profile.github} />
          </div>
        </Card>
      </aside>

      <div className="space-y-4">
        <Card className="p-5 sm:p-6">
          <h2 className="font-display text-lg font-semibold">Send a Message</h2>
          <form className="mt-5 space-y-4" noValidate onSubmit={form.handleSubmit(onSubmit)}>
            <Field label="Name" htmlFor="contact-name" error={form.formState.errors.name?.message}>
              <Input id="contact-name" placeholder="Your full name" {...form.register("name")} />
            </Field>
            <Field label="Email" htmlFor="contact-email" error={form.formState.errors.email?.message}>
              <Input id="contact-email" placeholder="your.email@example.com" type="email" {...form.register("email")} />
            </Field>
            <Field label="Company (optional)" htmlFor="contact-company">
              <Input id="contact-company" placeholder="Company or organization" {...form.register("company")} />
            </Field>
            <Field label="Subject" htmlFor="contact-subject" error={form.formState.errors.subject?.message}>
              <select
                id="contact-subject"
                className="h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                {...form.register("subject")}
              >
                {subjects.map((subject) => <option key={subject}>{subject}</option>)}
              </select>
            </Field>
            <Field label="Message" htmlFor="contact-message" error={form.formState.errors.message?.message}>
              <Textarea id="contact-message" className="min-h-36" placeholder="Tell me about the opportunity or project…" {...form.register("message")} />
            </Field>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={form.formState.isSubmitting}>
              <Send /> {form.formState.isSubmitting ? "Sending…" : "Send Message"}
            </Button>
          </form>
        </Card>

        <Card className="space-y-3 p-4 text-xs leading-5 text-muted">
          <p className="flex items-center gap-2"><Clock3 className="size-4" /> Usually responds within 24–48 hours.</p>
          <p className="flex items-center gap-2"><Lock className="size-4" /> Your information is private and only used to respond to your message.</p>
        </Card>
      </div>
    </div>
  );
}

function QuickLink({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <a className="group flex items-start gap-3 rounded-lg py-1" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-muted text-primary [&_svg]:size-4">{icon}</span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-foreground group-hover:text-primary">{label}</span>
        <span className="block truncate text-[11px] text-muted">{value}</span>
      </span>
    </a>
  );
}

function Field({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </div>
  );
}
