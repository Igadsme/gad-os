import { experience } from "./experience";
import { projects } from "./projects";

export type SkillCategory =
  | "Languages"
  | "Frameworks"
  | "Cloud"
  | "AI/ML"
  | "Security"
  | "Tools";

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  résuméGroup: string;
};

export const skillCategories: SkillCategory[] = [
  "Languages",
  "Frameworks",
  "Cloud",
  "AI/ML",
  "Security",
  "Tools",
];

export const skills: Skill[] = [
  { id: "python", name: "Python", category: "Languages", résuméGroup: "Languages" },
  { id: "typescript", name: "TypeScript", category: "Languages", résuméGroup: "Languages" },
  { id: "javascript", name: "JavaScript", category: "Languages", résuméGroup: "Languages" },
  { id: "sql", name: "SQL", category: "Languages", résuméGroup: "Languages" },
  { id: "go", name: "Go", category: "Languages", résuméGroup: "Languages" },
  { id: "java", name: "Java", category: "Languages", résuméGroup: "Languages" },
  { id: "bash", name: "Bash", category: "Languages", résuméGroup: "Languages" },
  { id: "csharp", name: "C#", category: "Languages", résuméGroup: "Languages" },
  { id: "html", name: "HTML", category: "Languages", résuméGroup: "Languages" },
  { id: "css", name: "CSS", category: "Languages", résuméGroup: "Languages" },
  { id: "yaml", name: "YAML", category: "Languages", résuméGroup: "Languages" },
  { id: "json", name: "JSON", category: "Languages", résuméGroup: "Languages" },
  { id: "cpp", name: "C++", category: "Languages", résuméGroup: "Languages" },
  { id: "nextjs", name: "Next.js", category: "Frameworks", résuméGroup: "Frameworks/Libraries" },
  { id: "react", name: "React", category: "Frameworks", résuméGroup: "Frameworks/Libraries" },
  { id: "nodejs", name: "Node.js", category: "Frameworks", résuméGroup: "Frameworks/Libraries" },
  { id: "fastapi", name: "FastAPI", category: "Frameworks", résuméGroup: "Frameworks/Libraries" },
  { id: "flask", name: "Flask", category: "Frameworks", résuméGroup: "Frameworks/Libraries" },
  { id: "pytorch", name: "PyTorch", category: "Frameworks", résuméGroup: "Frameworks/Libraries" },
  { id: "tensorflow", name: "TensorFlow", category: "Frameworks", résuméGroup: "Frameworks/Libraries" },
  { id: "numpy", name: "NumPy", category: "Frameworks", résuméGroup: "Frameworks/Libraries" },
  { id: "pandas", name: "Pandas", category: "Frameworks", résuméGroup: "Frameworks/Libraries" },
  { id: "prisma", name: "Prisma", category: "Frameworks", résuméGroup: "Frameworks/Libraries" },
  { id: "aws", name: "AWS", category: "Cloud", résuméGroup: "Cloud/Infrastructure" },
  { id: "docker", name: "Docker", category: "Cloud", résuméGroup: "Cloud/Infrastructure" },
  { id: "postgresql", name: "PostgreSQL", category: "Cloud", résuméGroup: "Cloud/Infrastructure" },
  { id: "redis", name: "Redis", category: "Cloud", résuméGroup: "Cloud/Infrastructure" },
  { id: "mongodb", name: "MongoDB", category: "Cloud", résuméGroup: "Cloud/Infrastructure" },
  { id: "mysql", name: "MySQL", category: "Cloud", résuméGroup: "Cloud/Infrastructure" },
  { id: "rag", name: "RAG", category: "AI/ML", résuméGroup: "AI/ML" },
  { id: "embeddings", name: "Embeddings", category: "AI/ML", résuméGroup: "AI/ML" },
  { id: "yolov8", name: "YOLOv8", category: "AI/ML", résuméGroup: "AI/ML" },
  { id: "gemini-api", name: "Gemini API", category: "AI/ML", résuméGroup: "AI/ML" },
  { id: "openai-api", name: "OpenAI API", category: "AI/ML", résuméGroup: "AI/ML" },
  { id: "pinecone", name: "Pinecone", category: "AI/ML", résuméGroup: "AI/ML" },
  { id: "sentinel", name: "Microsoft Sentinel", category: "Security", résuméGroup: "Security" },
  { id: "kql", name: "KQL", category: "Security", résuméGroup: "Security" },
  { id: "cef", name: "CEF", category: "Security", résuméGroup: "Security" },
  { id: "log-analytics", name: "Log Analytics", category: "Security", résuméGroup: "Security" },
  { id: "palo-alto", name: "Palo Alto", category: "Security", résuméGroup: "Security" },
  { id: "servicenow", name: "ServiceNow", category: "Tools", résuméGroup: "Tools" },
  { id: "rest-api", name: "REST APIs", category: "Tools", résuméGroup: "Tools" },
  { id: "integration-hub", name: "Integration Hub", category: "Tools", résuméGroup: "Tools" },
  { id: "git", name: "Git", category: "Tools", résuméGroup: "Tools" },
  { id: "github", name: "GitHub", category: "Tools", résuméGroup: "Tools" },
  { id: "jira", name: "Jira", category: "Tools", résuméGroup: "Tools" },
  { id: "jenkins", name: "Jenkins", category: "Tools", résuméGroup: "Tools" },
  { id: "tableau", name: "Tableau", category: "Tools", résuméGroup: "Tools" },
  { id: "cucumber", name: "Cucumber", category: "Tools", résuméGroup: "Tools" },
  { id: "cypress", name: "Cypress", category: "Tools", résuméGroup: "Tools" },
  { id: "azure", name: "Azure", category: "Tools", résuméGroup: "Tools" },
];

export type SkillEvidence = {
  title: string;
  kind: string;
  description: string;
  href: string;
  hrefLabel: string;
};

export function getSkillById(id: string) {
  return skills.find((skill) => skill.id === id);
}

export function getSkillsByCategory(category: SkillCategory) {
  return skills.filter((skill) => skill.category === category);
}

export function getSkillEvidence(skill: Skill): {
  projectCount: number;
  roleCount: number;
  items: SkillEvidence[];
} {
  const relatedProjects = projects.filter((project) =>
    project.relatedSkillIds.includes(skill.id) ||
    project.technologies.some(
      (tech) => tech.toLowerCase() === skill.name.toLowerCase(),
    ),
  );

  const relatedRoles = experience.filter((role) =>
    role.technologies.some(
      (tech) => tech.toLowerCase() === skill.name.toLowerCase(),
    ),
  );

  const items: SkillEvidence[] = [
    ...relatedProjects.map((project) => {
      const employer = experience.find(
        (role) => role.id === project.relatedExperienceId,
      );
      return {
        title: project.title,
        kind: employer
          ? `${project.category} · ${employer.company}`
          : project.category,
        description: project.highlight,
        href: `/projects/${project.slug}`,
        hrefLabel: "Case Study",
      };
    }),
    ...relatedRoles
      .filter(
        (role) =>
          !relatedProjects.some(
            (project) => project.relatedExperienceId === role.id,
          ),
      )
      .map((role) => ({
        title: role.company,
        kind: role.role,
        description: role.summary,
        href: `/experience?role=${role.id}`,
        hrefLabel: "Experience",
      })),
  ];

  return {
    projectCount: relatedProjects.length,
    roleCount: relatedRoles.length,
    items,
  };
}
