"use client";

import { Download, ExternalLink, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { defaultResumeOptions, getResumeModel } from "@/lib/resume";
import { profile } from "@/data/profile";

const model = getResumeModel(defaultResumeOptions);

export function ResumeStudio() {
  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_250px]">
      <Card className="overflow-hidden bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:p-7">
        <article className="mx-auto max-w-[720px] text-[11px] leading-[1.45] text-slate-700">
          <header className="border-b border-slate-200 pb-4">
            <h2 className="font-display text-[26px] font-bold tracking-[-0.035em] text-slate-950">
              {profile.name}
            </h2>
            <p className="mt-1 font-medium text-slate-600">{profile.headline}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" /> {profile.location}
              </span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.linkedin}>{profile.linkedinHandle}</a>
              <a href={profile.github}>{profile.githubHandle}</a>
            </div>
          </header>

          <ResumeSection title="Education">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold text-slate-900">{profile.education.school}</p>
                <p className="mt-0.5">{profile.education.degree}</p>
              </div>
              <div className="shrink-0 text-right">
                <p>{profile.education.location}</p>
                <p className="mt-0.5">Expected {profile.education.end}</p>
              </div>
            </div>
          </ResumeSection>

          <ResumeSection title="Experience">
            <div className="space-y-3.5">
              {model.experience.slice(0, 4).map((role) => (
                <div key={role.id}>
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-bold text-slate-900">
                      {role.company} — {role.role}
                    </p>
                    <p className="shrink-0 text-[10px]">{role.location}</p>
                  </div>
                  <p className="mt-0.5 text-[10px] text-slate-500">
                    {role.start} – {role.end}
                  </p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-4">
                    {role.bullets.slice(0, 2).map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Projects">
            <div className="space-y-2.5">
              {model.projects.map((project) => (
                <div key={project.slug}>
                  <p className="font-bold text-slate-900">
                    {project.title} — {project.subtitle}
                  </p>
                  <ul className="mt-1 list-disc pl-4">
                    {project.bullets.slice(0, 1).map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Skills">
            <div className="space-y-1">
              {model.skillGroups.map((group) => (
                <p key={group.group}>
                  <span className="font-bold text-slate-900">{group.group}: </span>
                  {group.items.join(", ")}
                </p>
              ))}
            </div>
          </ResumeSection>
        </article>
      </Card>

      <Card className="space-y-2 p-4 lg:sticky lg:top-5">
        <h2 className="mb-3 font-display text-base font-semibold">Actions</h2>
        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <a href={profile.resumePdf} download>
            <Download /> Download PDF
          </a>
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={() => {
            void navigator.clipboard.writeText(profile.email);
            toast.success("Email copied");
          }}
        >
          <Mail /> Copy Email
        </Button>
        <Button asChild variant="secondary" className="w-full">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <ExternalLink /> Open LinkedIn
          </a>
        </Button>
        <Button asChild variant="secondary" className="w-full">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <ExternalLink /> Open GitHub
          </a>
        </Button>
      </Card>
    </div>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-slate-200 py-4 last:border-0 last:pb-0">
      <h3 className="mb-2.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-950">
        {title}
      </h3>
      {children}
    </section>
  );
}
