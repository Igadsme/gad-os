export type ProjectCategory =
  | "Full Stack"
  | "AI/ML"
  | "Cybersecurity"
  | "Automation";

export type ProjectStatus = "Live" | "Case Study" | "Internal System" | "Archived";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categories: ProjectCategory[];
  timeframe: string;
  featured: boolean;
  status: ProjectStatus;
  visualMetrics: readonly [
    { label: string; value: string },
    { label: string; value: string },
  ];
  liveUrl?: string;
  liveLabel?: string;
  repoUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  summary: string;
  highlight: string;
  problem: string;
  approach: string;
  outcome: string;
  bullets: string[];
  technologies: string[];
  relatedExperienceId?: string;
  relatedSkillIds: string[];
};

export const projectCategories: ProjectCategory[] = [
  "Full Stack",
  "AI/ML",
  "Cybersecurity",
  "Automation",
];

export const projects: Project[] = [
  {
    slug: "devdash",
    title: "DevDash",
    subtitle: "Developer Productivity · Full Stack",
    category: "Full Stack",
    categories: ["Full Stack", "AI/ML"],
    timeframe: "April 2026 – May 2026",
    featured: true,
    status: "Case Study",
    visualMetrics: [
      { label: "events", value: "1K+" },
      { label: "reporting", value: "−80%" },
    ],
    repoUrl: "https://github.com/Igadsme/DevDash",
    imageUrl: "/images/projects/devdash-project-card.png",
    imageAlt:
      "DevDash developer command center showing integrations and an engineering activity timeline",
    summary:
      "A privacy-first developer command center that transforms activity from GitHub, GitLab, Bitbucket, CI/CD, and calendar tools into ranked actions, engineering insights, focus estimates, and grounded AI summaries.",
    highlight:
      "LLM summarization and task prioritization reduced manual reporting time by 80%.",
    problem:
      "Engineering teams spend too much time reconstructing status from commits, pull requests, and CI events.",
    approach:
      "Built a Next.js and Prisma app that ingests GitHub APIs, then uses the OpenAI API to summarize activity and prioritize tasks.",
    outcome:
      "Processed 1,000+ commits, PRs, and CI/CD events, with LLM summarization cutting manual reporting time by 80%.",
    bullets: [
      "Built full-stack developer productivity SaaS with Next.js and Prisma, integrating GitHub APIs to process 1,000+ commits, PRs, and CI/CD events",
      "Developed LLM summarization and task prioritization via OpenAI API, reducing manual reporting time by 80%",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Gemini"],
    relatedSkillIds: [
      "nextjs",
      "typescript",
      "openai-api",
      "javascript",
    ],
  },
  {
    slug: "nestai",
    title: "NestAI",
    subtitle: "Multi-Agent AI · Cybersecurity",
    category: "Cybersecurity",
    categories: ["Cybersecurity", "AI/ML"],
    timeframe: "May 2025",
    featured: true,
    status: "Case Study",
    visualMetrics: [
      { label: "hackathon rank", value: "2nd/23" },
      { label: "AI agents", value: "3" },
    ],
    repoUrl: "https://github.com/Igadsme/nestai_cli_project",
    imageUrl: "/images/projects/nestai-project-card.png",
    imageAlt:
      "NestAI secure-code analysis dashboard showing red, blue, and controller agents with a findings summary",
    summary:
      "An award-winning secure-code analysis CLI where adversarial Red and Blue AI agents evaluate software, a controller verifies findings, and the system generates a consolidated security report. Placed second out of 23 teams.",
    highlight:
      "Placed second out of 23 teams with a three-agent adversarial security workflow.",
    problem:
      "Security reviews often produce disconnected findings without a consistent way to challenge, verify, and prioritize them.",
    approach:
      "Built Red and Blue analysis agents plus a controller that correlates evidence, verifies findings, and produces a consolidated HTML report.",
    outcome:
      "The multi-agent CLI placed second out of 23 teams and generated one prioritized report from adversarial analysis.",
    bullets: [
      "Orchestrated three specialized AI agents for offensive analysis, defensive review, and finding verification",
      "Generated consolidated HTML security reports with severity-ranked findings and risk scoring",
      "Placed second out of 23 teams in the KSU AI Club hackathon",
    ],
    technologies: [
      "Python",
      "Multi-Agent Systems",
      "OpenAI API",
      "Security Analysis",
      "CLI",
    ],
    relatedSkillIds: ["python", "openai-api"],
  },
  {
    slug: "ai-security-camera-investigator",
    title: "AI Security Camera Investigator",
    subtitle: "Computer Vision · Security",
    category: "AI/ML",
    categories: ["AI/ML", "Cybersecurity"],
    timeframe: "June 2026 – July 2026",
    featured: true,
    status: "Case Study",
    visualMetrics: [
      { label: "object classes", value: "7" },
      { label: "API routes", value: "20+" },
    ],
    repoUrl: "https://github.com/Igadsme/ai-security-investigator",
    imageUrl: "/images/projects/verisight-project-card.png",
    imageAlt:
      "VeriSight camera investigation dashboard showing synchronized CCTV timelines and chain-of-custody evidence",
    summary:
      "A forensic CCTV investigation platform that combines YOLOv8 detection, object tracking, natural-language search, synchronized multi-camera timelines, privacy redaction, and SHA-256 evidence exports.",
    highlight:
      "YOLOv8 detections plus embedding search return timestamped, ranked footage results.",
    problem:
      "Reviewing CCTV by hand is slow when the question is a person, object, or moment rather than a timestamp.",
    approach:
      "Engineered a YOLOv8 and FastAPI pipeline for detection and tracking, then layered embedding search over CCTV metadata.",
    outcome:
      "Ranked results with timestamped detections, turning footage into a queryable investigation surface.",
    bullets: [
      "Engineered a computer-vision pipeline with YOLOv8 and FastAPI to detect and track subjects across CCTV footage",
      "Built embedding-based semantic search over CCTV metadata, returning ranked results with timestamped detections",
    ],
    technologies: [
      "YOLOv8",
      "DeepSORT",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
    ],
    relatedSkillIds: [
      "python",
      "fastapi",
      "yolov8",
      "embeddings",
      "pytorch",
    ],
  },
  {
    slug: "sentinel-ingestion",
    title: "Sentinel Log Ingestion",
    subtitle: "Non-native telemetry into Microsoft Sentinel",
    category: "Cybersecurity",
    categories: ["Cybersecurity", "Automation"],
    timeframe: "January 2026 – June 2026",
    featured: false,
    status: "Internal System",
    visualMetrics: [
      { label: "queries", value: "KQL" },
      { label: "telemetry", value: "CEF" },
    ],
    summary:
      "Log ingestion for non-native sources in Microsoft Sentinel, including Palo Alto firewall syslog via CEF.",
    highlight:
      "KQL schema checks and cross-source correlation validated ingestion accuracy in Log Analytics.",
    problem:
      "Security telemetry that Sentinel does not natively understand still has to land in useful tables for detection work.",
    approach:
      "Designed DCRs, custom tables, and schemas, then a syslog pipeline for Palo Alto logs with CEF forwarding and severity-based filtering.",
    outcome:
      "Ingestion accuracy validated with KQL schema checks and cross-source correlation in Log Analytics.",
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
      "Log Analytics",
    ],
    relatedExperienceId: "shaw",
    relatedSkillIds: ["azure"],
  },
  {
    slug: "hiveu",
    title: "HiveU",
    subtitle: "AI StudyMatch Platform",
    category: "AI/ML",
    categories: ["AI/ML", "Full Stack"],
    timeframe: "2026",
    featured: false,
    status: "Case Study",
    visualMetrics: [
      { label: "match signals", value: "3" },
      { label: "REST routes", value: "10+" },
    ],
    repoUrl: "https://github.com/Igadsme/HIVEU",
    imageUrl: "/images/projects/hiveu-project-card.png",
    imageAlt:
      "HiveU AI StudyMatch dashboard showing course, availability, and study-style matching with a shared group workspace",
    summary:
      "An AI study-partner matching platform that combines courses, availability, and study style to rank compatible peers, then gives each group a shared workspace for chat, files, and tasks.",
    highlight:
      "Three matching signals power ranked recommendations and a shared collaboration workspace.",
    problem:
      "Students need compatible study partners, but schedules, courses, and preferred ways of working rarely align by chance.",
    approach:
      "Built a React client and FastAPI service that scores course overlap, availability, and study style, then supports group messaging, files, and tasks.",
    outcome:
      "Delivered a unified experience spanning discovery, ranked matches, and an active shared study workspace.",
    bullets: [
      "Combined three matching signals to rank compatible study partners",
      "Built 10+ FastAPI REST routes for matching and workspace features",
      "Created group chat, file sharing, and task management in one shared workspace",
    ],
    technologies: ["React", "FastAPI", "SQLModel", "Python", "Smart Matching"],
    relatedSkillIds: ["react", "python", "fastapi"],
  },
  {
    slug: "ai-recruiter-assistant",
    title: "AI Recruiter Assistant",
    subtitle: "Evidence-Grounded Candidate Copilot",
    category: "AI/ML",
    categories: ["AI/ML", "Full Stack"],
    timeframe: "2026",
    featured: false,
    status: "Case Study",
    visualMetrics: [
      { label: "eval questions", value: "100+" },
      { label: "CI checks", value: "6" },
    ],
    repoUrl: "https://github.com/Igadsme/ai-recruiter-assistant",
    imageUrl: "/images/projects/ai-recruiter-assistant-project-card.png",
    imageAlt:
      "AI Recruiter Assistant dashboard showing evidence-grounded candidate analysis, verified claims, and job-fit coverage",
    summary:
      "An evidence-grounded recruiting copilot that evaluates candidate fit, verifies résumé claims against source material, and maps strengths to job requirements with transparent coverage scores.",
    highlight:
      "Every candidate claim stays connected to résumé, GitHub, or LinkedIn evidence.",
    problem:
      "Recruiting summaries can sound confident while obscuring which claims are actually supported by candidate evidence.",
    approach:
      "Built retrieval signals across résumé, GitHub, and LinkedIn sources, then grounded evaluations and job-fit coverage in verifiable claims.",
    outcome:
      "Produced transparent candidate analyses backed by 100+ evaluation questions and six automated quality checks.",
    bullets: [
      "Grounded recruiting summaries in résumé, GitHub, and LinkedIn evidence",
      "Built claim verification and job-fit coverage across six competency areas",
      "Added 100+ evaluation questions and six CI checks for consistent analysis",
    ],
    technologies: ["Next.js", "Python", "FastAPI", "PostgreSQL", "OpenAI API"],
    relatedSkillIds: ["nextjs", "python", "fastapi", "postgresql", "openai-api"],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}
