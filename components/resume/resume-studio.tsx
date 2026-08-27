"use client";

import { useMemo, useState } from "react";
import { Download, ExternalLink, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/theme-switch";
import {
  defaultResumeOptions,
  getResumeModel,
  resumeFocusOptions,
  type ResumeOptions,
} from "@/lib/resume";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function ResumeStudio() {
  const [options, setOptions] = useState<ResumeOptions>(defaultResumeOptions);
  const model = useMemo(() => getResumeModel(options), [options]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <Card className="overflow-hidden p-5">
        <div className="mb-4 overflow-hidden rounded-[14px] border border-border bg-surface-muted">
          <object
            data={profile.resumePdf}
            type="application/pdf"
            className="hidden h-[420px] w-full md:block"
            aria-label="Résumé PDF preview"
          >
            <p className="p-4 text-sm text-muted">
              PDF preview is unavailable in this browser.{" "}
              <a className="text-primary" href={profile.resumePdf}>
                Open the résumé PDF
              </a>
              .
            </p>
          </object>
          <div className="p-4 md:hidden">
            <p className="text-sm text-muted">
              PDF preview works best on a larger screen.
            </p>
            <a
              className="mt-2 inline-flex min-h-11 items-center text-sm text-primary"
              href={profile.resumePdf}
            >
              Open résumé PDF
            </a>
          </div>
        </div>
        <h2 className="text-[28px] font-semibold tracking-tight">{profile.name}</h2>
        <p className="mt-1 text-sm text-muted">{profile.headline.replaceAll(" · ", " — ")}</p>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          <span>{profile.location}</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.linkedin}>{profile.linkedinHandle}</a>
          <a href={profile.github}>{profile.githubHandle}</a>
        </p>
        <section className="mt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide">Education</h3>
          <p className="mt-2 text-sm font-medium">{profile.education.school}</p>
          <p className="text-sm text-muted">
            {profile.education.status} · {profile.education.start} – {profile.education.end}
          </p>
          {options.style === "detailed" && (
            <p className="mt-1 text-sm text-muted">
              Coursework: {profile.education.coursework.join(", ")}
            </p>
          )}
        </section>
        <section className="mt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide">Experience</h3>
          <div className="mt-3 space-y-4">
            {model.experience.map((role) => (
              <div key={role.id}>
                <p className="text-sm font-medium">
                  {role.company} · {role.role}
                </p>
                <p className="text-xs text-muted">
                  {role.start} – {role.end} · {role.location}
                </p>
                <ul className="mt-1 list-disc pl-5 text-sm text-muted">
                  {(options.style === "compact" ? role.bullets.slice(0, 2) : role.bullets).map(
                    (bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide">Projects</h3>
          <div className="mt-3 space-y-3">
            {model.projects.map((project) => (
              <div key={project.slug}>
                <p className="text-sm font-medium">{project.title}</p>
                {options.includeProjectDescriptions && (
                  <ul className="mt-1 list-disc pl-5 text-sm text-muted">
                    {project.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
        {options.includeTechnicalSkills && (
          <section className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide">Skills</h3>
            <div className="mt-2 space-y-1 text-sm text-muted">
              {model.skillGroups.map((group) => (
                <p key={group.group}>
                  <span className="font-medium text-foreground">{group.group}: </span>
                  {group.items.join(", ")}
                </p>
              ))}
            </div>
          </section>
        )}
        {options.includeAwards && (
          <section className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Activities & Leadership
            </h3>
            <p className="mt-2 text-sm text-muted">
              Active member: {model.organizations.join(", ")}
            </p>
            <p className="text-sm text-muted">
              {model.honors.hackathonWins}× Hackathon Winner, {model.honors.hackathonParticipations}×
              Hackathon Participant · Dean’s List {model.honors.deansList}× · President’s List{" "}
              {model.honors.presidentsList}×
            </p>
          </section>
        )}
        {options.includeCertifications && (
          <section className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide">Certifications</h3>
            <p className="mt-2 text-sm text-muted">
              No certifications are listed on the current résumé.
            </p>
          </section>
        )}
      </Card>
      <div className="space-y-4">
        <Card className="space-y-2 p-4">
          <h2 className="font-semibold">Actions</h2>
          <Button asChild className="w-full">
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
        <Card className="space-y-4 p-4">
          <h2 className="font-semibold">Customize Résumé</h2>
          <div>
            <p className="mb-2 text-sm text-muted">Focus profile</p>
            <div className="flex rounded-xl border border-border p-1">
              {resumeFocusOptions.map((focus) => (
                <button
                  key={focus.id}
                  type="button"
                  onClick={() => setOptions((current) => ({ ...current, focus: focus.id }))}
                  className={cn(
                    "flex-1 rounded-lg px-2 py-1.5 text-xs",
                    options.focus === focus.id && "bg-primary text-white",
                  )}
                >
                  {focus.label}
                </button>
              ))}
            </div>
          </div>
          <ToggleRow
            label="Project Descriptions"
            checked={options.includeProjectDescriptions}
            onCheckedChange={(checked) =>
              setOptions((current) => ({ ...current, includeProjectDescriptions: checked }))
            }
          />
          <ToggleRow
            label="Technical Skills"
            checked={options.includeTechnicalSkills}
            onCheckedChange={(checked) =>
              setOptions((current) => ({ ...current, includeTechnicalSkills: checked }))
            }
          />
          <ToggleRow
            label="Certifications"
            checked={options.includeCertifications}
            onCheckedChange={(checked) =>
              setOptions((current) => ({ ...current, includeCertifications: checked }))
            }
          />
          <ToggleRow
            label="Awards & Honors"
            checked={options.includeAwards}
            onCheckedChange={(checked) =>
              setOptions((current) => ({ ...current, includeAwards: checked }))
            }
          />
          <div>
            <p className="mb-2 text-sm text-muted">Style</p>
            {(["compact", "detailed"] as const).map((style) => (
              <label key={style} className="mb-1 flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={options.style === style}
                  onChange={() => setOptions((current) => ({ ...current, style }))}
                />
                {style === "compact" ? "Compact (One page)" : "Detailed (Multi-page)"}
              </label>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between text-sm">
      {label}
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  );
}
