export type ExperienceType =
  | "internship"
  | "co-op"
  | "fellowship"
  | "teaching";

export type Experience = {
  id: string;
  company: string;
  role: string;
  type: ExperienceType;
  location: string;
  locationType: "On-site" | "Remote" | "Hybrid";
  start: string;
  end: string;
  startIso: string;
  endIso: string;
  bullets: string[];
  summary: string;
  impact?: {
    metric: string;
    explanation: string;
  };
  technologies: string[];
  linkedin?: string;
  color: string;
};

export const experienceTypeLabels: Record<ExperienceType, string> = {
  internship: "Internship",
  "co-op": "Co-op",
  fellowship: "Fellowship",
  teaching: "Teaching",
};

export const experience: Experience[] = [
  {
    id: "wellstar",
    company: "Wellstar Health System",
    role: "IT Platforms Applications Intern",
    type: "internship",
    location: "Marietta, GA",
    locationType: "On-site",
    start: "November 2025",
    end: "July 2026",
    startIso: "2025-11",
    endIso: "2026-07",
    summary:
      "Automated enterprise ITSM work on ServiceNow so platform teams could move tickets through intake and resolution with less manual glue.",
    bullets: [
      "Developed ServiceNow workflows using JS, server-side business rules, and Script Includes for enterprise automation",
      "Built REST APIs via ServiceNow Integration Hub to enable interoperability across enterprise platforms",
      "Automated ITSM workflows, cutting resolution backlog from 80% to 20% across 200-300 tickets",
    ],
    impact: {
      metric: "Backlog reduced 80% → 20%",
      explanation:
        "Automated ITSM workflows across 200–300 tickets using ServiceNow business rules, Script Includes, and Integration Hub REST APIs.",
    },
    technologies: [
      "JavaScript",
      "ServiceNow",
      "Integration Hub",
      "REST APIs",
    ],
    linkedin: "https://www.linkedin.com/in/igad",
    color: "#6D28D9",
  },
  {
    id: "shaw",
    company: "Shaw Industries",
    role: "Cybersecurity Co-op",
    type: "co-op",
    location: "Dalton, GA",
    locationType: "On-site",
    start: "January 2026",
    end: "June 2026",
    startIso: "2026-01",
    endIso: "2026-06",
    summary:
      "Built Microsoft Sentinel ingestion for non-native telemetry, including a syslog path for Palo Alto firewall logs.",
    bullets: [
      "Built log ingestion pipelines in Microsoft Sentinel via DCRs, custom tables, and schemas for non-native telemetry",
      "Architected a syslog pipeline for Palo Alto firewall logs via CEF forwarding with severity-based filtering",
      "Validated ingestion accuracy via KQL schema checks and cross-source correlation in Log Analytics",
    ],
    technologies: [
      "Microsoft Sentinel",
      "KQL",
      "Azure",
      "CEF",
      "Palo Alto",
      "Log Analytics",
    ],
    linkedin: "https://www.linkedin.com/in/igad",
    color: "#0F766E",
  },
  {
    id: "headstarter",
    company: "Headstarter AI",
    role: "Software Engineering Fellow",
    type: "fellowship",
    location: "Remote",
    locationType: "Remote",
    start: "July 2025",
    end: "September 2025",
    startIso: "2025-07",
    endIso: "2025-09",
    summary:
      "Shipped AI retrieval systems with Pinecone, Gemini, embeddings, and RAG while learning from live user data.",
    bullets: [
      "Built 5 AI projects using Pinecone, Gemini API, embeddings, and RAG API for semantic search and retrieval",
      "Analyzed user and project data to optimize AI features, supporting 500+ users and reach",
    ],
    impact: {
      metric: "500+ users reached",
      explanation:
        "Analyzed user and project data to optimize RAG, embeddings, and Gemini-powered features across five AI systems.",
    },
    technologies: [
      "Python",
      "Pinecone",
      "Gemini API",
      "RAG",
      "Embeddings",
    ],
    linkedin: "https://www.linkedin.com/in/igad",
    color: "#2563EB",
  },
  {
    id: "truespice",
    company: "TrueSpice Foods",
    role: "Web Developer Intern",
    type: "internship",
    location: "Tucker, GA",
    locationType: "On-site",
    start: "May 2025",
    end: "August 2025",
    startIso: "2025-05",
    endIso: "2025-08",
    summary:
      "Refactored a production marketing site for responsiveness, performance, and accessibility.",
    bullets: [
      "Refactored website using React and CSS media queries, improving cross-device responsiveness",
      "Optimized performance via semantic HTML and lazy loading, reducing load time by 30%",
      "Audited and resolved accessibility issues across key pages to improve usability for a broader user base",
    ],
    impact: {
      metric: "Load time reduced 30%",
      explanation:
        "Semantic HTML, lazy loading, and a React + CSS media-query refactor improved cross-device performance and accessibility.",
    },
    technologies: ["React", "JavaScript", "CSS", "HTML"],
    linkedin: "https://www.linkedin.com/in/igad",
    color: "#C2410C",
  },
  {
    id: "upcancer",
    company: "UpCancer",
    role: "Software Engineering Intern",
    type: "internship",
    location: "Atlanta, GA",
    locationType: "Hybrid",
    start: "January 2024",
    end: "May 2024",
    startIso: "2024-01",
    endIso: "2024-05",
    summary:
      "Built Python and TypeScript microservices with Redis-cached PostgreSQL and shared REST contracts with frontend engineers.",
    bullets: [
      "Built Python and TypeScript microservices using Redis-cached PostgreSQL, boosting throughput 15% and latency 20%",
      "Designed REST API contracts with front-end engineers, reducing integration friction across distributed services",
    ],
    impact: {
      metric: "Throughput +15% · latency +20%",
      explanation:
        "Python and TypeScript microservices on Redis-cached PostgreSQL, with REST contracts shared across distributed services.",
    },
    technologies: [
      "Python",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "REST APIs",
    ],
    linkedin: "https://www.linkedin.com/in/igad",
    color: "#1D4ED8",
  },
  {
    id: "lutheran",
    company: "Lutheran Service School",
    role: "Coding Instructor",
    type: "teaching",
    location: "Clarkston, GA",
    locationType: "On-site",
    start: "August 2021",
    end: "July 2022",
    startIso: "2021-08",
    endIso: "2022-07",
    summary:
      "Taught Python to students building first projects, including learners with limited English.",
    bullets: [
      "Mentored 25 students in Python with projects, building creativity, problem-solving, and coding skills",
      "Guided students with limited English in Python projects, teaching coding basics and independent skills",
    ],
    impact: {
      metric: "25 students mentored",
      explanation:
        "Python projects used as the teaching vehicle for problem-solving, creativity, and independent coding skills.",
    },
    technologies: ["Python"],
    linkedin: "https://www.linkedin.com/in/igad",
    color: "#334155",
  },
];

export function getExperienceById(id: string) {
  return experience.find((item) => item.id === id);
}
