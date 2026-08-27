"use client";

import { useState } from "react";
import { Mic, Send, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
};

const prompts = [
  "Summarize Imani’s cybersecurity projects",
  "What backend experience does Imani have?",
  "Which AI/ML systems are on the résumé?",
];

const sources = [
  { name: "Imani Gad — Résumé", updated: "Aug 2026" },
  { name: "Wellstar case study", updated: "Jul 2026" },
  { name: "Shaw Sentinel case study", updated: "Jun 2026" },
];

export function AssistantChat() {
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `I’m April, Imani’s career assistant. Ask about roles, projects, or skills — I’ll stay inside the résumé.`,
    },
  ]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || pending) return;
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

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
      <Card className="flex min-h-[560px] flex-col">
        <div className="flex items-center gap-3 border-b border-border p-4">
          <span className="flex size-10 items-center justify-center rounded-full bg-violet-soft text-violet">
            <Sparkles className="size-4" />
          </span>
          <div>
            <h1 className="font-semibold">Ask April about Imani</h1>
            <p className="text-sm text-muted">Your AI career assistant.</p>
          </div>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={
                message.role === "user"
                  ? "ml-auto max-w-[80%] rounded-2xl bg-primary px-4 py-3 text-sm text-white"
                  : "max-w-[90%] rounded-2xl bg-surface-muted px-4 py-3 text-sm whitespace-pre-wrap"
              }
            >
              {message.content}
              {message.sources && message.sources.length > 0 && (
                <p className="mt-2 text-[11px] text-muted">
                  Sources: {message.sources.join(" · ")}
                </p>
              )}
            </div>
          ))}
          {pending && <p className="text-sm text-muted">April is checking the résumé…</p>}
        </div>
        <div className="border-t border-border p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => send(prompt)}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted hover:bg-surface-muted"
              >
                {prompt}
              </button>
            ))}
          </div>
          <form
            className="flex items-center gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
          >
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={`Ask April anything about ${profile.firstName}...`}
            />
            <button type="button" className="rounded-xl p-2 text-muted" aria-label="Voice coming soon">
              <Mic className="size-4" />
            </button>
            <button
              type="submit"
              className="rounded-xl bg-primary p-2 text-white"
              aria-label="Send"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      </Card>
      <div className="space-y-4">
        <Card className="p-4">
          <h2 className="text-sm font-semibold">Sources</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {sources.map((source) => (
              <li key={source.name} className="rounded-xl border border-border p-3">
                <p className="font-medium">{source.name}</p>
                <p className="text-xs text-muted">Updated {source.updated}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-4">
          <h2 className="text-sm font-semibold">Related projects</h2>
          <ul className="mt-3 space-y-2">
            {projects.slice(0, 4).map((project) => (
              <li key={project.slug} className="rounded-xl border border-border p-3">
                <a href={`/projects/${project.slug}`} className="text-sm font-medium">
                  {project.title}
                </a>
                <p className="text-xs text-muted">{project.timeframe}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
