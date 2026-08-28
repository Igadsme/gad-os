export type ProjectCategory =
  | "Full Stack"
  | "AI/ML"
  | "Cybersecurity"
  | "Automation";

export type ProjectStatus =
  | "Deployed"
  | "Completed"
  | "Prototype"
  | "In Progress"
  | "Private Enterprise Work";

export type ProjectCaseStudy = {
  overview: string;
  role: string;
  solution: string;
  architecture: readonly string[];
  decisions: readonly string[];
  challenge: string;
  results: readonly string[];
  testing: readonly string[];
  reflection: string;
};

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
  metricContext: string;
  problem: string;
  approach: string;
  outcome: string;
  bullets: string[];
  technologies: string[];
  relatedExperienceId?: string;
  relatedSkillIds: string[];
  caseStudy?: ProjectCaseStudy;
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
    status: "Prototype",
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
    metricContext:
      "Project dataset: 1,000+ Git and CI/CD events; the 80% figure compares manual status-reporting time before and after generated summaries.",
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
    caseStudy: {
      overview:
        "DevDash is a privacy-first developer command center for turning fragmented engineering activity into a concise operating view.",
      role: "Product designer and full-stack engineer",
      solution:
        "A Next.js application normalizes events from developer tools, stores structured activity with Prisma, and uses an LLM to produce grounded summaries and ranked next steps.",
      architecture: ["Developer APIs", "Event normalization", "Prisma + PostgreSQL", "Grounded AI summaries", "Dashboard actions"],
      decisions: [
        "Keep source events visible so every generated summary remains traceable.",
        "Separate ingestion from summarization so model failures never block activity capture.",
        "Prioritize privacy by keeping the product focused on a user’s own engineering data.",
      ],
      challenge:
        "Events from repositories and CI systems describe similar work with different schemas, timestamps, and levels of detail.",
      results: [
        "Processed a project dataset of 1,000+ commits, pull requests, and CI/CD events.",
        "Reduced manual reporting time by 80% in the project workflow.",
      ],
      testing: ["Normalized-event validation", "Summary grounding checks", "Responsive dashboard review"],
      reflection:
        "The next iteration would add more connector-level permission controls and explicit confidence indicators for generated recommendations.",
    },
  },
  {
    slug: "nestai",
    title: "NestAI",
    subtitle: "Multi-Agent AI · Cybersecurity",
    category: "Cybersecurity",
    categories: ["Cybersecurity", "AI/ML"],
    timeframe: "May 2025",
    featured: true,
    status: "Completed",
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
    metricContext:
      "Competition result from the KSU AI Club hackathon: second place among 23 participating teams.",
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
    caseStudy: {
      overview:
        "NestAI is a secure-code analysis CLI built for a KSU AI Club hackathon. It uses adversarial agents to challenge and verify security findings before reporting them.",
      role: "AI systems engineer and security workflow designer",
      solution:
        "A Red Agent searches for weaknesses, a Blue Agent evaluates defenses, and a controller correlates their evidence into one severity-ranked HTML report.",
      architecture: ["Source input", "Red Agent", "Blue Agent", "Controller verification", "HTML security report"],
      decisions: [
        "Use opposing analysis roles to reduce one-sided conclusions.",
        "Route all findings through a controller instead of merging raw agent output.",
        "Generate a portable HTML report so results can be reviewed without the CLI.",
      ],
      challenge:
        "Multiple agents can repeat, contradict, or overstate findings unless evidence is normalized before prioritization.",
      results: [
        "Placed second out of 23 teams in the KSU AI Club hackathon.",
        "Deployed three specialized agents and generated one consolidated report per analysis run.",
      ],
      testing: ["Agent-output schema checks", "Finding deduplication review", "Report generation checks"],
      reflection:
        "A stronger next version would benchmark findings against known vulnerable repositories and display confidence alongside severity.",
    },
  },
  {
    slug: "ai-security-camera-investigator",
    title: "VeriSight — AI Security Camera Investigator",
    subtitle: "Computer Vision · Security",
    category: "AI/ML",
    categories: ["AI/ML", "Cybersecurity"],
    timeframe: "June 2026 – July 2026",
    featured: true,
    status: "Prototype",
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
    metricContext:
      "Prototype surface with seven configured object classes and more than 20 documented API routes.",
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
    caseStudy: {
      overview:
        "VeriSight is a forensic CCTV investigation prototype that turns footage into a searchable, evidence-aware timeline.",
      role: "Product designer, computer-vision engineer, and backend engineer",
      solution:
        "YOLOv8 and DeepSORT create timestamped detections, FastAPI exposes investigation workflows, and embedding search maps natural-language queries to ranked footage moments.",
      architecture: ["CCTV footage", "YOLOv8 detection", "DeepSORT tracking", "FastAPI + metadata", "Search and evidence export"],
      decisions: [
        "Store detection metadata separately from footage so search stays fast and auditable.",
        "Preserve timestamps and hashes throughout export to support chain-of-custody review.",
        "Use natural-language search as a layer over structured detections, not as a replacement for them.",
      ],
      challenge:
        "The same subject can move between frames and cameras while lighting, occlusion, and scene changes reduce detection consistency.",
      results: [
        "Configured seven object classes for the prototype investigation workflow.",
        "Designed more than 20 API routes for cameras, detections, investigations, search, and evidence.",
      ],
      testing: ["API contract checks", "Detection timeline review", "Evidence-hash verification"],
      reflection:
        "Before production use, the system would need dataset-specific accuracy benchmarks, retention policies, and human review controls for consequential decisions.",
    },
  },
  {
    slug: "sentinel-ingestion",
    title: "Sentinel Log Ingestion",
    subtitle: "Non-native telemetry into Microsoft Sentinel",
    category: "Cybersecurity",
    categories: ["Cybersecurity", "Automation"],
    timeframe: "January 2026 – June 2026",
    featured: false,
    status: "Private Enterprise Work",
    visualMetrics: [
      { label: "queries", value: "KQL" },
      { label: "telemetry", value: "CEF" },
    ],
    summary:
      "Log ingestion for non-native sources in Microsoft Sentinel, including Palo Alto firewall syslog via CEF.",
    highlight:
      "KQL schema checks and cross-source correlation validated ingestion accuracy in Log Analytics.",
    metricContext:
      "Private enterprise work; implementation details are intentionally limited to résumé-safe architecture and validation methods.",
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
    status: "Prototype",
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
    metricContext:
      "Prototype scope: three matching inputs and more than 10 REST routes shown in the project interface.",
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
    status: "Prototype",
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
    metricContext:
      "Prototype evaluation library with 100+ questions and six automated quality checks.",
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
