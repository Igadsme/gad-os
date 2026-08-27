import { experience } from "@/data/experience";
import { labExperiments } from "@/data/lab";
import { allNav } from "@/data/navigation";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

export type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  type: "Project" | "Employer" | "Role" | "Skill" | "Lab" | "Page";
};

export function buildSearchIndex(): SearchResult[] {
  const pages: SearchResult[] = allNav.map((item) => ({
    id: `page-${item.href}`,
    title: item.label,
    subtitle: "Page",
    href: item.href,
    type: "Page",
  }));

  const projectResults: SearchResult[] = projects.map((project) => ({
    id: `project-${project.slug}`,
    title: project.title,
    subtitle: project.subtitle,
    href: `/projects/${project.slug}`,
    type: "Project",
  }));

  const employers: SearchResult[] = experience.map((role) => ({
    id: `employer-${role.id}`,
    title: role.company,
    subtitle: role.role,
    href: `/experience?role=${role.id}`,
    type: "Employer",
  }));

  const roles: SearchResult[] = experience.map((role) => ({
    id: `role-${role.id}`,
    title: role.role,
    subtitle: role.company,
    href: `/experience?role=${role.id}`,
    type: "Role",
  }));

  const skillResults: SearchResult[] = skills.map((skill) => ({
    id: `skill-${skill.id}`,
    title: skill.name,
    subtitle: skill.category,
    href: `/skills?skill=${skill.id}`,
    type: "Skill",
  }));

  const labResults: SearchResult[] = labExperiments.map((experiment) => ({
    id: `lab-${experiment.slug}`,
    title: experiment.title,
    subtitle: experiment.status,
    href: `/lab?experiment=${experiment.slug}`,
    type: "Lab",
  }));

  return [
    ...pages,
    ...projectResults,
    ...employers,
    ...roles,
    ...skillResults,
    ...labResults,
  ];
}

export function searchPortfolio(query: string, limit = 12): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return buildSearchIndex().slice(0, limit);

  return buildSearchIndex()
    .map((item) => {
      const haystack = `${item.title} ${item.subtitle} ${item.type}`.toLowerCase();
      const score = haystack.includes(q)
        ? 2
        : item.title.toLowerCase().startsWith(q)
          ? 3
          : haystack.split(/\s+/).some((word) => word.startsWith(q))
            ? 1
            : 0;
      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map((entry) => entry.item);
}
