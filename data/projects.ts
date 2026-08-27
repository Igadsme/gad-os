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
    subtitle: "AI-powered developer productivity platform",
    category: "Full Stack",
    categories: ["Full Stack", "AI/ML"],
    timeframe: "April 2026 – May 2026",
    featured: true,
    status: "Live",
    visualMetrics: [
      { label: "events", value: "1K+" },
      { label: "reporting", value: "−80%" },
    ],
    liveUrl: "https://devdash.com",
    liveLabel: "devdash.com",
    summary:
      "Full-stack developer productivity SaaS that turns GitHub activity into summaries and prioritized work.",
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
    technologies: ["Next.js", "Prisma", "TypeScript", "OpenAI API", "GitHub"],
    relatedSkillIds: [
      "nextjs",
      "typescript",
      "openai-api",
      "javascript",
    ],
  },
  {
    slug: "ai-security-camera-investigator",
    title: "AI Security Camera Investigator",
    subtitle: "Computer vision search over CCTV footage",
    category: "AI/ML",
    categories: ["AI/ML", "Cybersecurity"],
    timeframe: "June 2026 – July 2026",
    featured: true,
    status: "Case Study",
    visualMetrics: [
      { label: "pipeline", value: "2-stage" },
      { label: "results", value: "ranked" },
    ],
    summary:
      "Detects and tracks subjects in CCTV footage, then ranks moments with embedding search over metadata.",
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
      "FastAPI",
      "Python",
      "Embeddings",
      "PyTorch",
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
    featured: true,
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
    slug: "servicenow-itsm",
    title: "ServiceNow ITSM Automation",
    subtitle: "Enterprise workflow and integration APIs",
    category: "Automation",
    categories: ["Automation", "Full Stack"],
    timeframe: "November 2025 – July 2026",
    featured: false,
    status: "Internal System",
    visualMetrics: [
      { label: "backlog", value: "80→20" },
      { label: "tickets", value: "300" },
    ],
    summary:
      "ServiceNow workflows, Script Includes, and Integration Hub REST APIs for hospital IT platforms.",
    highlight:
      "Resolution backlog moved from 80% to 20% across 200–300 tickets.",
    problem:
      "Manual ITSM intake and approvals left a large share of tickets sitting in backlog.",
    approach:
      "Wrote JavaScript workflows, server-side business rules, and Script Includes, then exposed REST APIs through Integration Hub.",
    outcome:
      "Automated ITSM workflows cut resolution backlog from 80% to 20% across 200–300 tickets.",
    bullets: [
      "Developed ServiceNow workflows using JS, server-side business rules, and Script Includes for enterprise automation",
      "Built REST APIs via ServiceNow Integration Hub to enable interoperability across enterprise platforms",
      "Automated ITSM workflows, cutting resolution backlog from 80% to 20% across 200–300 tickets",
    ],
    technologies: [
      "JavaScript",
      "ServiceNow",
      "Integration Hub",
      "REST APIs",
    ],
    relatedExperienceId: "wellstar",
    relatedSkillIds: ["javascript"],
  },
  {
    slug: "headstarter-rag",
    title: "Headstarter RAG Systems",
    subtitle: "Five AI retrieval projects for live users",
    category: "AI/ML",
    categories: ["AI/ML"],
    timeframe: "July 2025 – September 2025",
    featured: false,
    status: "Case Study",
    visualMetrics: [
      { label: "AI builds", value: "5" },
      { label: "users", value: "500+" },
    ],
    summary:
      "Semantic search and retrieval systems built with Pinecone, Gemini, embeddings, and RAG APIs.",
    highlight:
      "Feature work informed by user and project data, supporting 500+ users.",
    problem:
      "Product questions and documents needed retrieval that keyword search could not cover well.",
    approach:
      "Built five AI projects around embeddings, Pinecone, Gemini, and RAG APIs, then tuned features from observed usage.",
    outcome:
      "Semantic search and retrieval features reached 500+ users during the fellowship.",
    bullets: [
      "Built 5 AI projects using Pinecone, Gemini API, embeddings, and RAG API for semantic search and retrieval",
      "Analyzed user and project data to optimize AI features, supporting 500+ users and reach",
    ],
    technologies: [
      "Pinecone",
      "Gemini API",
      "RAG",
      "Embeddings",
      "Python",
    ],
    relatedExperienceId: "headstarter",
    relatedSkillIds: [
      "python",
      "pinecone",
      "gemini-api",
      "rag",
      "embeddings",
    ],
  },
  {
    slug: "upcancer-microservices",
    title: "UpCancer Microservices",
    subtitle: "Python and TypeScript services on cached Postgres",
    category: "Full Stack",
    categories: ["Full Stack"],
    timeframe: "January 2024 – May 2024",
    featured: false,
    status: "Internal System",
    visualMetrics: [
      { label: "throughput", value: "+15%" },
      { label: "latency", value: "−20%" },
    ],
    summary:
      "Distributed microservices with Redis-cached PostgreSQL and shared REST contracts.",
    highlight:
      "Throughput improved 15% and latency improved 20%.",
    problem:
      "Frontend and backend teams needed stable contracts while services scaled past chatty database access.",
    approach:
      "Implemented Python and TypeScript microservices with Redis in front of PostgreSQL, and designed REST contracts with frontend engineers.",
    outcome:
      "Throughput rose 15% and latency improved 20%, with less integration friction across services.",
    bullets: [
      "Built Python and TypeScript microservices using Redis-cached PostgreSQL, boosting throughput 15% and latency 20%",
      "Designed REST API contracts with front-end engineers, reducing integration friction across distributed services",
    ],
    technologies: [
      "Python",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "REST APIs",
    ],
    relatedExperienceId: "upcancer",
    relatedSkillIds: [
      "python",
      "typescript",
      "postgresql",
      "redis",
    ],
  },
  {
    slug: "truespice-web",
    title: "TrueSpice Website",
    subtitle: "Responsive, accessible production web refactor",
    category: "Full Stack",
    categories: ["Full Stack"],
    timeframe: "May 2025 – August 2025",
    featured: false,
    status: "Case Study",
    visualMetrics: [
      { label: "load time", value: "−30%" },
      { label: "accessibility", value: "audited" },
    ],
    summary:
      "React refactor of a production site with performance and accessibility work on key pages.",
    highlight: "Load time reduced by 30%.",
    problem:
      "The existing site did not hold up across devices, and accessibility issues blocked a broader audience.",
    approach:
      "Refactored with React and CSS media queries, then applied semantic HTML, lazy loading, and an accessibility audit.",
    outcome:
      "Cross-device responsiveness improved and load time dropped 30%.",
    bullets: [
      "Refactored website using React and CSS media queries, improving cross-device responsiveness",
      "Optimized performance via semantic HTML and lazy loading, reducing load time by 30%",
      "Audited and resolved accessibility issues across key pages to improve usability for a broader user base",
    ],
    technologies: ["React", "JavaScript", "CSS", "HTML"],
    relatedExperienceId: "truespice",
    relatedSkillIds: ["react", "javascript"],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}
