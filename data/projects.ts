export type ProjectCategory =
  | "Full Stack"
  | "AI/ML"
  | "Cybersecurity"
  | "Automation";

export type ProjectStatus =
  | "Live"
  | "In Development"
  | "Research"
  | "Prototype"
  | "Deployed"
  | "Completed"
  | "In Progress"
  | "Private Enterprise Work";

export type ProjectCaseStudy = {
  overview: string;
  role: string;
  solution: string;
  architecture: readonly string[];
  architectureCaption?: string;
  whatBuilt?: readonly string[];
  decisions: readonly string[];
  challenge: string;
  results: readonly string[];
  testing: readonly string[];
  reflection: string;
  currentStatus?: string;
};

export type ProjectVisualStyle = "marketplace" | "analytics" | "security" | "research";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  engineering?: string;
  statusDetail?: string;
  visualStyle?: ProjectVisualStyle;
  visualLabel?: string;
  category: ProjectCategory;
  categories: ProjectCategory[];
  timeframe?: string;
  featured: boolean;
  status: ProjectStatus;
  visualMetrics?: readonly [
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
    slug: "neighborly",
    title: "Neighborly",
    subtitle: "Full-Stack / Backend / Product Engineering",
    engineering:
      "A React and TypeScript client integrates with a NestJS modular API; Prisma models the PostgreSQL-backed marketplace. Authentication and trust/safety workflows are implemented in dedicated backend modules.",
    statusDetail:
      "The repository says launch is pending product-owner approval. Production deployment has not occurred.",
    visualStyle: "marketplace",
    visualLabel: "Marketplace / product",
    category: "Full Stack",
    categories: ["Full Stack"],
    featured: true,
    status: "In Development",
    repoUrl: "https://github.com/Igadsme/neighborly",
    imageUrl: "/images/projects/neighborly-home.png",
    imageAlt: "Neighborly marketplace home screen from its browser smoke-test artifact",
    summary:
      "A request-first local marketplace for neighbors to discover and exchange housing, services, jobs, and community listings.",
    highlight: "A Vite client, modular API, and marketplace workflows share one product.",
    metricContext: "",
    problem:
      "Local exchanges need a shared place to discover listings and coordinate community transactions.",
    approach:
      "Connect a React client to a NestJS API, with Prisma and PostgreSQL for marketplace data and dedicated authentication and safety modules.",
    outcome:
      "Implements listings, discovery, messaging, saved items, profiles, and trust/safety flows in a request-first marketplace.",
    bullets: [
      "Built a React and TypeScript marketplace client with listing, discovery, messaging, profile, and saved-item flows.",
      "Implemented a NestJS modular API with Prisma/PostgreSQL persistence, authentication, and trust/safety modules.",
      "Integrated the client and API through the repository's Vite API client and documented local Compose staging setup.",
    ],
    technologies: ["React", "TypeScript", "NestJS", "PostgreSQL", "Vite", "Prisma"],
    relatedSkillIds: ["react", "typescript", "postgresql"],
    caseStudy: {
      overview:
        "Neighborly is a request-first local marketplace for community listings and exchanges.",
      role: "Full-stack engineer",
      solution:
        "A Vite-based React/TypeScript frontend calls a NestJS modular API. Prisma models marketplace data in PostgreSQL; authentication and safety concerns are separated into backend modules.",
      architecture: [
        "React + TypeScript client (Vite)",
        "API client / HTTP requests",
        "NestJS modules: auth, listings, users, safety",
        "Prisma data access",
        "PostgreSQL",
      ],
      architectureCaption:
        "The diagram follows the repository's client/API split, backend modules, Prisma service, and PostgreSQL schema.",
      whatBuilt: [
        "Marketplace screens for discovery, categories, listing details, creation, messaging, saved items, profiles, and dashboards.",
        "Backend authentication, listing, user-profile, messaging, and trust/safety modules.",
        "Frontend-to-API wiring with a modular NestJS backend and Prisma/PostgreSQL persistence.",
      ],
      decisions: [
        "Keep the API a modular monolith, with marketplace capabilities separated into NestJS modules.",
        "Use a request-first marketplace flow rather than presenting the project as a launched public service.",
      ],
      challenge:
        "Connecting a broad set of marketplace flows to consistent API behavior while keeping authentication and trust/safety responsibilities explicit.",
      results: [
        "Repository artifacts include browser-smoke captures for the implemented marketplace flows.",
        "The repository documents a local Docker Compose staging environment; this is not a public production deployment.",
      ],
      testing: [
        "Repository includes backend auth, listing, safety, and HTTP/service tests, plus frontend marketplace and trust/safety tests.",
        "The repository documents frontend typecheck/build and backend Prisma generation, typecheck, tests, and build checks.",
      ],
      reflection:
        "Production release remains gated on product-owner approval and deployment decisions documented in the repository.",
      currentStatus:
        "Production preparation is documented, but the public launch and production deployment are explicitly pending approval.",
    },
  },
  {
    slug: "devdash",
    title: "DevDash",
    subtitle: "Developer Tooling / Analytics / Integrations",
    engineering:
      "GitHub OAuth and server-side GitHub API sync feed normalized repository, pull-request, issue, review, CI, and commit signals into durable Prisma-backed activity and sync snapshots. The application derives ranked action items, timelines, focus analysis, and grounded weekly summaries from that data.",
    statusDetail:
      "The Vercel deployment at dev-dash-woad.vercel.app returned HTTP 200 when checked.",
    visualStyle: "analytics",
    visualLabel: "Developer activity / analytics",
    category: "Full Stack",
    categories: ["Full Stack", "AI/ML"],
    featured: true,
    status: "Live",
    liveUrl: "https://dev-dash-woad.vercel.app",
    repoUrl: "https://github.com/Igadsme/DevDash",
    imageUrl: "/images/projects/devdash.png",
    imageAlt: "DevDash engineering health dashboard",
    summary:
      "A developer productivity tool that turns GitHub repository, pull-request, issue, review, CI, and commit activity into action items, timelines, focus analysis, and weekly summaries.",
    highlight:
      "Server-side GitHub sync powers prioritized workflows and activity views.",
    metricContext: "",
    problem:
      "Developer activity is distributed across repositories, pull requests, issues, reviews, CI signals, and commits.",
    approach:
      "Uses GitHub OAuth and server-side GitHub API requests to sync activity, normalize signals, persist sync state, and build productivity workflows.",
    outcome:
      "Presents synced GitHub activity as ranked action items, timelines, focus analysis, and grounded weekly summaries with a deterministic fallback.",
    bullets: [
      "Implemented GitHub OAuth, personal and organization workspace discovery, repository views, recent commits, and ranked pull-request, issue, review, and CI action items.",
      "Built server-side GitHub synchronization, durable sync state, last-known-good snapshots, typed pull-request signals, and account export/deletion controls.",
      "Added grounded weekly summaries with a deterministic fallback when OpenAI is unavailable.",
    ],
    technologies: ["Next.js", "TypeScript", "NextAuth", "Prisma", "GitHub API", "OpenAI API"],
    relatedSkillIds: [
      "nextjs",
      "typescript",
      "openai-api",
      "javascript",
    ],
    caseStudy: {
      overview:
        "DevDash is a developer productivity application that collects a user's GitHub activity and organizes it into a single operational view.",
      role: "Full-stack engineer",
      solution:
        "GitHub OAuth establishes the account; server-side GitHub API sync normalizes activity, persists events and durable snapshots through Prisma, then powers action-item, timeline, focus, and summary workflows.",
      architecture: [
        "GitHub OAuth / NextAuth",
        "Server-side GitHub API sync",
        "Signal normalization and ranking",
        "Prisma events + sync snapshots",
        "Action items, timeline, focus, summaries",
      ],
      architectureCaption:
        "This reflects the repository's OAuth, server-side GitHub integration, event/snapshot persistence, and application views.",
      whatBuilt: [
        "GitHub OAuth sign-in and personal/organization workspace discovery.",
        "Repository, commit, pull-request, issue, review, and CI activity workflows with attention filters and timelines.",
        "Durable sync state and last-known-good snapshots for API outages.",
        "Grounded weekly summaries with deterministic fallback behavior when OpenAI is unavailable.",
      ],
      decisions: [
        "Keep GitHub requests on the server so access tokens are not sent to browser responses.",
        "Persist sync snapshots so previously synchronized views remain available when GitHub is unavailable.",
        "Provide a deterministic summary fallback when the OpenAI service is unavailable.",
      ],
      challenge:
        "GitHub's repositories, pull requests, issues, reviews, CI status, and commits expose different signals that must be normalized into coherent workflows.",
      results: [
        "Repository includes typed pull-request signals, durable sync snapshots, account controls, and CI validation.",
      ],
      testing: [
        "Repository documents typecheck, Vitest, and production build checks and includes a CI workflow.",
        "Account export/deletion, sync snapshots, and pull-request signal filtering are covered by project code and tests.",
      ],
      reflection:
        "The current integration centers on GitHub; additional provider integrations should only be added when implemented and verified.",
      currentStatus:
        "The public Vercel deployment responds successfully. The repository supports GitHub integration; no other source-provider integration is claimed here.",
    },
  },
  {
    slug: "nestai",
    title: "NestAI",
    subtitle: "Multi-Agent AI · Cybersecurity",
    category: "Cybersecurity",
    categories: ["Cybersecurity", "AI/ML"],
    timeframe: "May 2025",
    featured: false,
    status: "Completed",
    visualMetrics: [
      { label: "hackathon rank", value: "2nd/32" },
      { label: "AI agents", value: "3" },
    ],
    repoUrl: "https://github.com/Igadsme/nestai_cli_project",
    imageUrl: "/images/projects/nestai.png",
    imageAlt: "NestAI secure code analysis dashboard",
    summary:
      "An award-winning secure-code analysis CLI where adversarial Red and Blue AI agents evaluate software, a controller verifies findings, and the system generates a consolidated security report. Placed second out of 32 teams.",
    highlight:
      "Placed second out of 32 teams with a three-agent adversarial security workflow.",
    metricContext:
      "Competition result from the KSU AI Club hackathon: second place among 32 participating teams.",
    problem:
      "Security reviews often produce disconnected findings without a consistent way to challenge, verify, and prioritize them.",
    approach:
      "Built Red and Blue analysis agents plus a controller that correlates evidence, verifies findings, and produces a consolidated HTML report.",
    outcome:
      "The multi-agent CLI placed second out of 32 teams and generated one prioritized report from adversarial analysis.",
    bullets: [
      "Orchestrated three specialized AI agents for offensive analysis, defensive review, and finding verification",
      "Generated consolidated HTML security reports with severity-ranked findings and risk scoring",
      "Placed second out of 32 teams in the KSU AI Club hackathon",
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
        "Placed second out of 32 teams in the KSU AI Club hackathon.",
        "Deployed three specialized agents and generated one consolidated report per analysis run.",
      ],
      testing: ["Agent-output schema checks", "Finding deduplication review", "Report generation checks"],
      reflection:
        "A stronger next version would benchmark findings against known vulnerable repositories and display confidence alongside severity.",
    },
  },
  {
    slug: "ai-security-investigator",
    title: "AI Security Investigator",
    subtitle: "Security Engineering / Applied AI",
    engineering:
      "A Python video-processing pipeline exposes investigation workflows through FastAPI and SQLAlchemy, with detections and tracks persisted for search and case review. YOLOv8 performs detection; tracking, optional semantic search, optional Gemini/Ollama analysis, and evidence workflows are separate components.",
    statusDetail:
      "The repository documents a Hugging Face Space deployment, but the Space is currently paused; no working public deployment was verified.",
    visualStyle: "security",
    visualLabel: "Investigation / evidence",
    category: "Cybersecurity",
    categories: ["Cybersecurity", "AI/ML"],
    featured: true,
    status: "Prototype",
    repoUrl: "https://github.com/Igadsme/ai-security-investigator",
    summary:
      "A CCTV investigation system for uploading footage, reviewing detected and tracked objects, searching for events, and assembling case evidence.",
    highlight: "Connects video analysis with searchable investigation and evidence workflows.",
    metricContext: "",
    problem:
      "Investigators need to find relevant events across video and camera timelines, then preserve context while reviewing and sharing evidence.",
    approach:
      "Processes video into detections, tracks, and events, then exposes search and case workflows through a FastAPI service.",
    outcome:
      "The repository implements video investigation, search, cases, timelines, audit, evidence export, privacy redaction, and optional AI-assisted summaries.",
    bullets: [
      "Built video upload and processing workflows using OpenCV, YOLOv8 detections, and configurable tracking.",
      "Implemented search, cases, multi-camera timelines, audit records, evidence exports, and privacy redaction.",
      "Added optional Gemini/Ollama summaries and optional ChromaDB vector indexing; SQL and rule-based search paths remain available.",
    ],
    technologies: ["Python", "FastAPI", "SQLAlchemy", "YOLOv8", "OpenCV", "Next.js", "SQLite (local)", "PostgreSQL (optional)", "ChromaDB (optional)", "Gemini / Ollama (optional)"],
    relatedSkillIds: ["python", "fastapi", "yolov8", "embeddings", "pytorch"],
    caseStudy: {
      overview:
        "AI Security Investigator is a CCTV investigation system that connects video analysis to case review, search, audit, and evidence handling.",
      role: "Full-stack and applied-AI engineering",
      solution:
        "Uploaded video is processed into detections, tracks, and events. The FastAPI service exposes data and investigation routes to a Next.js interface; optional vector and AI services augment selected search and summary workflows.",
      architecture: [
        "Video upload",
        "Frame processing / YOLOv8 detection",
        "Tracking + event extraction",
        "FastAPI / SQLAlchemy persistence",
        "Search, cases, audit, evidence",
      ],
      architectureCaption:
        "The flow follows the repository's video processor, detection/tracking modules, database, forensic API, and investigation UI. Optional AI/vector services are not required for the main workflow.",
      whatBuilt: [
        "Video upload and processing with YOLOv8 detection and selectable lightweight or DeepSORT tracking.",
        "Investigation search, video/case workflows, multi-camera timelines, and audit records.",
        "Evidence clip export with a JSON sidecar and SHA-256, plus redaction and case-report workflows.",
        "Optional Gemini/Ollama summaries and optional ChromaDB vector search.",
      ],
      decisions: [
        "Keep AI summaries and ChromaDB vector indexing optional; the README documents rule-based and SQL search paths without them.",
        "Keep timestamps, camera context, and hashes attached to evidence workflows.",
        "Present results as investigator tools and evidence context, not autonomous security decisions.",
      ],
      challenge:
        "Connecting frame-level detections and tracks to timestamped events, multi-camera case timelines, search results, and reviewable evidence.",
      results: [
        "Repository documents investigation APIs for video, search, cases, timelines, audit, evidence, redaction, and annotations.",
      ],
      testing: [
        "Repository includes backend API tests and documents a forensic smoke-test script.",
        "No detection-accuracy or incident-resolution benchmark is claimed.",
      ],
      reflection:
        "Any operational use would require environment-specific model validation, data-retention review, and human oversight; no autonomous SOC replacement is claimed.",
      currentStatus:
        "Prototype. The documented Hugging Face Space is paused, and a working public deployment was not verified.",
    },
  },
  {
    slug: "kynovar",
    title: "Kynovar",
    subtitle: "Machine Learning Research / Simulation",
    engineering:
      "Seeded simulators generate controlled dynamical systems and observable trajectories; data tooling prepares training and out-of-distribution splits for multiple dynamics models. Evaluation scripts record rollout and benchmark results, but the current repository explicitly marks research milestones and some results as work in progress.",
    statusDetail:
      "Research is active. The latest repository commit says milestone acceptance runs are pending and preliminary benchmark results should not be treated as final.",
    visualStyle: "research",
    visualLabel: "Simulation / model evaluation",
    category: "AI/ML",
    categories: ["AI/ML"],
    featured: true,
    status: "Research",
    repoUrl: "https://github.com/Igadsme/Kynovar",
    imageUrl: "/images/projects/kynovar-workbench.png",
    imageAlt: "Kynovar research workbench screenshot from the repository's interactive-run artifacts",
    summary:
      "A research system for controlled synthetic universes, simulation, dynamics-model training, and evaluation on observed trajectories.",
    highlight:
      "Explores model behavior through reproducible simulations and evaluation workflows.",
    metricContext: "",
    problem:
      "Studying whether models can infer and revise explanations of unfamiliar physical systems requires controllable worlds and observable evidence.",
    approach:
      "Builds deterministic simulation and laboratory workflows, generates trajectory datasets, trains multiple dynamics-model families, and evaluates predictions including out-of-distribution cases.",
    outcome:
      "The repository contains simulator, dataset, model-training, benchmark, and OOD evaluation code; research results and milestone acceptance remain in progress.",
    bullets: [
      "Implemented seeded simulation and laboratory workflows that expose trajectories separately from evaluation-only hidden state.",
      "Added data generation, normalization, splits, training code, and model families including linear, MLP, GRU, and graph neural networks.",
      "Added rollout, benchmark, and out-of-distribution evaluation workflows with run metadata for reproducibility.",
    ],
    technologies: ["Python", "PyTorch", "NumPy", "SciPy", "SymPy", "Linear models", "MLP", "GRU", "GNN"],
    relatedSkillIds: ["python", "pytorch", "numpy"],
    caseStudy: {
      overview:
        "Kynovar is a research system for studying dynamics learning and scientific reasoning in controlled simulated universes.",
      role: "Research software engineer",
      solution:
        "The simulator and laboratory generate observable trajectories; dataset utilities prepare runs for training; model factories build baseline, recurrent, and graph-based dynamics models; evaluation code compares predictions and runs OOD analyses.",
      architecture: [
        "Seeded simulator / controlled universe",
        "Laboratory / observable trajectories",
        "Dataset generation, splits, normalization",
        "Linear, MLP, GRU, GNN model families",
        "Rollout benchmarks / OOD evaluation",
      ],
      architectureCaption:
        "This flow follows the repository's simulator, laboratory, data, model factory/training, and evaluation modules.",
      whatBuilt: [
        "Controlled synthetic universes and a laboratory interface for generating observations.",
        "Dataset generation, normalization, split, and OOD utilities.",
        "Trainable linear, MLP, GRU, GNN, and interaction-GNN dynamics models.",
        "Simulation, training, benchmark, and OOD scripts with recorded run metadata.",
      ],
      decisions: [
        "Separate observable trajectories from hidden state reserved for evaluation.",
        "Use seeded generation and run metadata to support reproducible experiments.",
        "Treat current benchmark results as preliminary until the repository's acceptance runs are complete.",
      ],
      challenge:
        "Model comparisons depend on stable data splits and uncontended, reproducible runs; the latest repository notes call out unstable regimes and pending acceptance reruns.",
      results: [
        "The repository contains model-training, rollout-evaluation, benchmark, and OOD workflows.",
        "The latest commit explicitly labels current milestone work and results as WIP/preliminary.",
      ],
      testing: [
        "A pytest suite covers simulator, data, models, evaluation, and reproducibility paths.",
        "The latest repository status says no milestone has passed its sequential, uncontended acceptance run; benchmark results remain preliminary.",
      ],
      reflection:
        "The next research step is to complete the documented acceptance reruns before treating model comparisons or milestone results as settled.",
      currentStatus:
        "Research in progress; current milestone results are explicitly marked WIP and preliminary in the repository.",
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
  const canonicalSlug = slug === "ai-security-camera-investigator" ? "ai-security-investigator" : slug;
  return projects.find((project) => project.slug === canonicalSlug);
}

const primaryProjectOrder = [
  "neighborly",
  "devdash",
  "ai-security-investigator",
  "kynovar",
];

export function getOrderedProjects() {
  const order = new Map(primaryProjectOrder.map((slug, index) => [slug, index]));
  return [...projects].sort(
    (a, b) => (order.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.slug) ?? Number.MAX_SAFE_INTEGER),
  );
}

export function getFeaturedProjects() {
  return getOrderedProjects().filter((project) => project.featured);
}
