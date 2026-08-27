"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Mic, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AprilMark, type AprilState } from "@/components/brand/april-mark";
import { Tooltip } from "@/components/ui/tooltip";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
};

const prompts = [
  "Summarize Imani’s cybersecurity work",
  "What backend experience does Imani have?",
  "Which AI/ML systems are on the résumé?",
  "What impact did Imani deliver at Wellstar?",
];

const sourceCatalog = [
  { type: "Résumé", title: "Imani Gad — Résumé", section: "Source of truth", href: "/resume" },
  { type: "Experience", title: "Wellstar Health System", section: "IT Platforms intern", href: "/experience?role=wellstar" },
  { type: "Experience", title: "Shaw Industries", section: "Cybersecurity co-op", href: "/experience?role=shaw" },
  { type: "Project", title: "DevDash", section: "Case study", href: "/projects/devdash" },
] as const;

function sourcesFromAnswer(names: string[] | undefined) {
  if (!names?.length) return sourceCatalog.slice(0, 2);
  const matched = sourceCatalog.filter((source) =>
    names.some((name) =>
      name.toLowerCase().includes(source.title.split(" ")[0].toLowerCase()) ||
      source.title.toLowerCase().includes(name.toLowerCase().split(" ")[0] ?? ""),
    ),
  );
  return matched.length > 0 ? matched : sourceCatalog.slice(0, 2);
}

function relatedFromSources(names: string[] | undefined) {
  const haystack = (names ?? []).join(" ").toLowerCase();
  const matched = projects.filter((project) =>
    haystack.includes(project.title.toLowerCase().split(" ")[0] ?? "") ||
    haystack.includes(project.slug.split("-")[0] ?? ""),
  );
  return (matched.length > 0 ? matched : projects.slice(0, 3)).slice(0, 3);
}

export function AssistantChat() {
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const lastAssistant = [...messages].reverse().find((message) => message.role === "assistant");
  const panelSources = sourcesFromAnswer(lastAssistant?.sources);
  const related = relatedFromSources(lastAssistant?.sources);
  const started = messages.some((message) => message.role === "user");

  const aprilState: AprilState = pending
    ? "thinking"
    : started
      ? "responding"
      : "idle";

  async function send(text: string) {
    const question = text.trim();
    if (pending) return;
    if (!question) {
      setError("Ask a short question first.");
      return;
    }
    if (question.length < 3) {
      setError("Ask a short, specific question.");
      return;
    }
    setError(null);
    setInput("");
    setMessages((current) => [...current, { role: "user", content: question }]);
    setPending(true);
    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const json = await response.json();
      if (!response.ok) {
        setMessages((current) => [
          ...current,
          { role: "assistant", content: json.error ?? "That question could not be sent." },
        ]);
        return;
      }
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: json.answer ?? "I couldn’t answer that from the résumé.",
          sources: json.sources,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "Something went wrong sending that question." },
      ]);
    } finally {
      setPending(false);
    }
  }

  const exampleCitation = useMemo(
    () => sourceCatalog[0],
    [],
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
      <Card className="flex min-h-[520px] flex-col">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <AprilMark size={40} state={aprilState} />
          <div>
            <h1 className="text-[15px] font-semibold">Ask April about Imani</h1>
            <p className="text-xs text-muted">
              {pending ? "Checking the résumé…" : "Grounded career assistant"}
            </p>
          </div>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {!started ? (
            <div className="space-y-4">
              <div className="flex gap-3">
                <AprilMark size={36} state="idle" />
                <div className="rounded-2xl bg-surface-muted px-4 py-3 text-sm leading-6">
                  I’m April, Imani’s career assistant. I only answer from the résumé,
                  projects and experience — I won’t invent employers, dates, or metrics.
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
                  Recruiter prompts
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {prompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void send(prompt)}
                      className="min-h-11 rounded-xl border border-border px-3 py-2 text-left text-sm text-muted hover:bg-surface-muted hover:text-foreground"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border px-3 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  How sources work
                </p>
                <p className="mt-1 text-sm leading-6 text-muted">
                  Every answer cites the résumé section or case study it came from.
                  Inline citations appear under April’s reply; the right panel lists the same sources.
                </p>
                <div className="mt-2 rounded-lg bg-surface-muted px-3 py-2 text-xs">
                  <span className="font-medium">{exampleCitation.type}</span>
                  {" · "}
                  {exampleCitation.title}
                  {" · "}
                  {exampleCitation.section}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn(
                    "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 whitespace-pre-wrap",
                    message.role === "user"
                      ? "ml-auto bg-primary text-white"
                      : "bg-surface-muted",
                  )}
                >
                  {message.content}
                  {message.sources && message.sources.length > 0 ? (
                    <p className="mt-2 text-[11px] opacity-80">
                      Sources: {message.sources.join(" · ")}
                    </p>
                  ) : null}
                </div>
              ))}
              {pending ? (
                <div className="flex items-center gap-2 text-sm text-muted">
                  <AprilMark size={28} state="thinking" />
                  April is checking the résumé…
                </div>
              ) : null}
            </>
          )}
        </div>
        <div className="border-t border-border p-3">
          <form
            className="flex items-center gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
          >
            <Input
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                if (error) setError(null);
              }}
              placeholder={`Ask April anything about ${profile.firstName}...`}
              aria-label="Question for April"
              aria-invalid={Boolean(error)}
            />
            <Tooltip label="Voice is not available yet">
              <button
                type="button"
                disabled
                className="inline-flex size-11 items-center justify-center rounded-xl text-muted opacity-50"
                aria-label="Voice is not available yet"
              >
                <Mic className="size-4" />
              </button>
            </Tooltip>
            <button
              type="submit"
              className="inline-flex size-11 items-center justify-center rounded-xl bg-primary text-white active:scale-[0.98]"
              aria-label="Send"
              disabled={pending}
            >
              <Send className="size-4" />
            </button>
          </form>
          {error ? <p className="mt-2 text-xs text-danger">{error}</p> : null}
        </div>
      </Card>
      <div className="space-y-3">
        <Card className="p-3.5">
          <h2 className="text-sm font-semibold">Sources</h2>
          <ul className="mt-2 space-y-2">
            {panelSources.map((source) => (
              <li key={source.title} className="rounded-xl border border-border px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-muted">{source.type}</p>
                <p className="text-[13px] font-medium">{source.title}</p>
                <p className="text-xs text-muted">{source.section}</p>
                <Link href={source.href} className="mt-1 inline-flex min-h-11 items-center text-sm text-primary">
                  Open source
                </Link>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-3.5">
          <h2 className="text-sm font-semibold">Related projects</h2>
          <ul className="mt-2 space-y-2">
            {related.map((project) => (
              <li key={project.slug} className="rounded-xl border border-border px-3 py-2">
                <Link href={`/projects/${project.slug}`} className="text-[13px] font-medium">
                  {project.title}
                </Link>
                <p className="text-xs text-muted">{project.category}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
