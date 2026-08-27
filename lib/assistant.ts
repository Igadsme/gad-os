import { experience } from "@/data/experience";
import { honors, organizations, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

export function buildAssistantContext() {
  const experienceBlock = experience
    .map(
      (role) =>
        `${role.role} at ${role.company} (${role.start} – ${role.end}, ${role.location}). ${role.bullets.join(" ")}`,
    )
    .join("\n");

  const projectBlock = projects
    .map(
      (project) =>
        `${project.title} (${project.timeframe}): ${project.bullets.join(" ")} Technologies: ${project.technologies.join(", ")}.`,
    )
    .join("\n");

  const skillBlock = skills.map((skill) => skill.name).join(", ");

  return `You are April, Imani Gad's career assistant.
Answer only from the facts below. If something is not listed, say you do not have that detail.
Never invent employers, dates, metrics, projects, awards, or technologies.
Speak in concise, recruiter-friendly prose. Prefer bullets when listing experience.

PROFILE
Name: ${profile.name}
Headline: ${profile.headline}
Email: ${profile.email}
Phone: ${profile.phone}
Location: ${profile.location}
LinkedIn: ${profile.linkedin}
GitHub: ${profile.github}
Education: ${profile.education.status}, ${profile.education.school}, ${profile.education.location}, ${profile.education.start} – ${profile.education.end}
Coursework: ${profile.education.coursework.join(", ")}
Availability: ${profile.availability}

HONORS
${honors.hackathonWins}x hackathon winner, ${honors.hackathonParticipations}x participant
Dean's List ${honors.deansList}x, President's List ${honors.presidentsList}x
Organizations: ${organizations.join(", ")}

EXPERIENCE
${experienceBlock}

PROJECTS
${projectBlock}

SKILLS
${skillBlock}`;
}

const FACT_SNIPPETS = [
  ...experience.flatMap((role) => [
    `${role.role} ${role.company} ${role.bullets.join(" ")}`,
    role.summary,
  ]),
  ...projects.flatMap((project) => [project.summary, ...project.bullets]),
  `${profile.education.school} ${profile.education.degree} ${profile.education.end}`,
  `Hackathon winner ${honors.hackathonWins} participant ${honors.hackathonParticipations}`,
];

export function groundedFallbackAnswer(question: string) {
  const q = question.toLowerCase();
  const hits = [
    ...experience.filter((role) =>
      `${role.company} ${role.role} ${role.bullets.join(" ")}`
        .toLowerCase()
        .includes(q.split(/\s+/)[0] ?? ""),
    ),
    ...projects.filter((project) =>
      `${project.title} ${project.summary}`.toLowerCase().includes(q.split(/\s+/)[0] ?? ""),
    ),
  ];

  if (/cyber|sentinel|security|shaw/.test(q)) {
    const shaw = experience.find((role) => role.id === "shaw");
    return {
      answer: shaw
        ? `Imani’s cybersecurity work is the Shaw Industries co-op (${shaw.start} – ${shaw.end}):\n\n${shaw.bullets.map((b) => `• ${b}`).join("\n")}`
        : "I don’t have that detail.",
      sources: ["Shaw Industries experience", "Résumé"],
    };
  }

  if (/wellstar|servicenow|itsm|backlog/.test(q)) {
    const wellstar = experience.find((role) => role.id === "wellstar");
    return {
      answer: wellstar
        ? `At Wellstar Health System (${wellstar.start} – ${wellstar.end}), Imani was an ${wellstar.role}:\n\n${wellstar.bullets.map((b) => `• ${b}`).join("\n")}`
        : "I don’t have that detail.",
      sources: ["Wellstar experience", "Résumé"],
    };
  }

  if (/backend|microservice|upcancer|python|typescript/.test(q)) {
    const upcancer = experience.find((role) => role.id === "upcancer");
    return {
      answer: upcancer
        ? `Backend and services work includes UpCancer (${upcancer.start} – ${upcancer.end}):\n\n${upcancer.bullets.map((b) => `• ${b}`).join("\n")}\n\nRelated project: DevDash (Next.js, Prisma, OpenAI API, GitHub).`
        : "I don’t have that detail.",
      sources: ["UpCancer experience", "DevDash case study", "Résumé"],
    };
  }

  if (/ai|ml|rag|pinecone|gemini|yolo|camera/.test(q)) {
    return {
      answer:
        "AI/ML evidence on the résumé:\n\n• Headstarter AI (Jul 2025 – Sep 2025): 5 AI projects with Pinecone, Gemini API, embeddings, and RAG; features supporting 500+ users.\n• AI Security Camera Investigator (Jun 2026 – Jul 2026): YOLOv8 + FastAPI detection/tracking and embedding search over CCTV metadata.\n• DevDash: OpenAI API summarization and task prioritization, reducing manual reporting time by 80%.\n• Coursework: Machine Learning, Deep Learning.",
      sources: ["Headstarter experience", "AI Security Camera Investigator", "DevDash", "Résumé"],
    };
  }

  if (/resume|résumé|contact|email|linkedin|github/.test(q)) {
    return {
      answer: `Imani Gad — ${profile.headline}\n${profile.email} · ${profile.phone}\n${profile.linkedinHandle} · ${profile.githubHandle}\n${profile.education.school}, ${profile.education.end}`,
      sources: ["Résumé"],
    };
  }

  const matched = FACT_SNIPPETS.filter((snippet) =>
    q.split(/\s+/).some((word) => word.length > 3 && snippet.toLowerCase().includes(word)),
  ).slice(0, 3);

  if (matched.length === 0 && hits.length === 0) {
    return {
      answer:
        "I can only answer from Imani’s résumé and case studies. Try asking about Wellstar, Shaw, UpCancer, DevDash, the AI camera project, or skills like Python, Next.js, or Sentinel.",
      sources: ["Résumé"],
    };
  }

  const wellKnown = experience.slice(0, 3);
  return {
    answer: `Here’s what I can confirm from Imani’s résumé:\n\n${wellKnown.map((role) => `• ${role.role}, ${role.company} (${role.start} – ${role.end})`).join("\n")}\n\nAsk about a company, project, or skill for a grounded deep-dive.`,
    sources: ["Résumé"],
  };
}
