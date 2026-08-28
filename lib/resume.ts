import { experience } from "@/data/experience";
import { honors, organizations, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

export type ResumeFocus = "software" | "ai" | "cyber";

export const resumeFocusOptions: { id: ResumeFocus; label: string }[] = [
  { id: "software", label: "Software" },
  { id: "ai", label: "AI/ML" },
  { id: "cyber", label: "Cybersecurity" },
];

const experienceOrder: Record<ResumeFocus, string[]> = {
  software: [
    "upcancer",
    "truespice",
    "wellstar",
    "headstarter",
    "shaw",
    "lutheran",
  ],
  ai: [
    "headstarter",
    "upcancer",
    "shaw",
    "wellstar",
    "truespice",
    "lutheran",
  ],
  cyber: [
    "shaw",
    "wellstar",
    "headstarter",
    "upcancer",
    "truespice",
    "lutheran",
  ],
};

const projectOrder: Record<ResumeFocus, string[]> = {
  software: [
    "devdash",
    "ai-security-camera-investigator",
    "sentinel-ingestion",
    "nestai",
    "hiveu",
    "ai-recruiter-assistant",
  ],
  ai: [
    "ai-security-camera-investigator",
    "devdash",
    "sentinel-ingestion",
    "nestai",
    "hiveu",
    "ai-recruiter-assistant",
  ],
  cyber: [
    "sentinel-ingestion",
    "ai-security-camera-investigator",
    "devdash",
    "nestai",
    "hiveu",
    "ai-recruiter-assistant",
  ],
};

export type ResumeOptions = {
  focus: ResumeFocus;
  includeProjectDescriptions: boolean;
  includeTechnicalSkills: boolean;
  includeCertifications: boolean;
  includeAwards: boolean;
  style: "compact" | "detailed";
};

export const defaultResumeOptions: ResumeOptions = {
  focus: "software",
  includeProjectDescriptions: true,
  includeTechnicalSkills: true,
  includeCertifications: false,
  includeAwards: true,
  style: "compact",
};

function sortById<T extends { id?: string; slug?: string }>(
  items: T[],
  order: string[],
  key: "id" | "slug",
) {
  return [...items].sort((a, b) => {
    const aKey = String(a[key]);
    const bKey = String(b[key]);
    return order.indexOf(aKey) - order.indexOf(bKey);
  });
}

export function getResumeModel(options: ResumeOptions) {
  const orderedExperience = sortById(experience, experienceOrder[options.focus], "id");
  const orderedProjects = sortById(projects, projectOrder[options.focus], "slug");

  const skillGroups = [
    "Languages",
    "Frameworks/Libraries",
    "Cloud/Infrastructure",
    "AI/ML",
    "Tools",
  ].map((group) => ({
    group,
    items: skills.filter((skill) => skill.résuméGroup === group).map((skill) => skill.name),
  }));

  return {
    profile,
    experience: options.style === "compact" ? orderedExperience.slice(0, 5) : orderedExperience,
    projects: options.style === "compact" ? orderedProjects.slice(0, 2) : orderedProjects,
    skillGroups,
    honors,
    organizations,
    options,
  };
}
