export type ArchitectureNode = {
  id: string
  label: string
  detail: string
  row: number
  column: number
}

export type ArchitectureEdge = {
  from: string
  to: string
}

export type ProjectArchitecture = {
  nodes: ArchitectureNode[]
  edges: ArchitectureEdge[]
}

export type ProjectEntry = {
  id: string
  title: string
  subtitle: string
  start?: string
  end?: string
  bullets: string[]
  technologies: string[]
  metrics: string[]
  categories: Array<'ai' | 'fullstack' | 'computer-vision' | 'research' | 'marketplace'>
  problem: string
  solution: string
  architectureSummary: string
  architecture: ProjectArchitecture
  contributed: string[]
  challenges: string[]
  impact: string[]
  validation: string[]
  status: 'Live' | 'In Development' | 'Prototype' | 'Research'
  sourceNotes?: string[]
  github?: string
  website?: string
}

export const projects: ProjectEntry[] = [
  {
    id: 'neighborly',
    title: 'Neighborly',
    subtitle: 'Full-Stack / Backend / Product Engineering',
    start: 'September 2026',
    end: 'Present',
    bullets: [
      'Engineered the Neighborly marketplace using Next.js, TypeScript, PostgreSQL, and Redis with listing and messaging workflows.',
      'Built geospatial matching APIs using PostGIS and Redis to rank nearby requests by distance, relevance, and trust.',
      'The current repository documents listing, discovery, messaging, saved-item, profile, and dashboard client flows.',
      'Built a modular NestJS API with Prisma and PostgreSQL persistence, authentication, and trust/safety modules.',
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'PostGIS', 'NestJS', 'Prisma'],
    metrics: [],
    categories: ['fullstack', 'marketplace'],
    problem:
      'Local exchanges need a shared place to discover listings and coordinate community transactions.',
    solution:
      'A request-first local marketplace combines listings and messaging with geospatial APIs that rank nearby requests by distance, relevance, and trust.',
    architectureSummary: 'Marketplace client → NestJS modules → Prisma / PostgreSQL, with Redis and PostGIS in geospatial matching.',
    architecture: {
      nodes: [
        { id: 'client', label: 'Marketplace client', detail: 'Resume: Next.js / TypeScript; current repository: React / TypeScript / Vite', row: 0, column: 1 },
        { id: 'api', label: 'API', detail: 'NestJS modular backend', row: 1, column: 1 },
        { id: 'modules', label: 'Domain modules', detail: 'Auth, listings, users, messaging, safety', row: 2, column: 0 },
        { id: 'data', label: 'Data access', detail: 'Prisma; Redis-backed ranking paths', row: 2, column: 2 },
        { id: 'database', label: 'Data stores', detail: 'PostgreSQL / PostGIS and Redis', row: 3, column: 1 },
      ],
      edges: [
        { from: 'client', to: 'api' },
        { from: 'api', to: 'modules' },
        { from: 'api', to: 'data' },
        { from: 'data', to: 'database' },
      ],
    },
    contributed: [
      'Built the React and TypeScript marketplace client and connected it to the NestJS API.',
      'Implemented marketplace flows for listings, discovery, messaging, saved items, profiles, and dashboards.',
      'Implemented backend authentication, listing, user-profile, messaging, and trust/safety modules.',
    ],
    challenges: [
      'Connecting a broad set of marketplace flows to consistent API behavior while keeping authentication and trust/safety responsibilities explicit.',
      'Keeping the API organized as a modular monolith while supporting listings, profiles, messaging, and safety workflows.',
    ],
    impact: [
      'Implemented listing, discovery, messaging, saved-item, profile, and trust/safety workflows.',
      'Production launch is not complete and remains pending approval.',
    ],
    validation: [
      'The repository includes backend auth, listing, safety, and HTTP/service tests, plus frontend marketplace and trust/safety tests.',
      'Browser-smoke artifacts cover implemented marketplace flows.',
      'Production launch is pending product-owner approval; no production deployment is claimed.',
      'Source mismatch: the updated resume lists Next.js; the current repository web package uses React and Vite. Do not describe these as one confirmed frontend stack.',
    ],
    status: 'In Development',
    sourceNotes: [
      'The supplied updated resume lists Next.js for Neighborly. The current verified repository web package and project case study use React with Vite. This frontend-stack source mismatch is unresolved; distinguish the resume claim from the repository implementation and do not claim they are the same version.',
    ],
    github: 'https://github.com/Igadsme/neighborly',
  },
  {
    id: 'devdash',
    title: 'DevDash',
    subtitle: 'Developer Tooling / Analytics / Integrations',
    start: 'April 2026',
    end: 'May 2026',
    bullets: [
      'Built a full-stack developer productivity application using Next.js, Prisma, and GitHub APIs to process more than 1,000 commits, pull requests, and CI/CD events.',
      'Implemented LLM-powered summarization and task prioritization using the OpenAI API, reducing manual reporting time by 60%.',
      'Built GitHub OAuth, server-side synchronization, durable activity snapshots, action-item ranking, timelines, focus analysis, and weekly summaries.',
    ],
    technologies: ['Next.js', 'TypeScript', 'NextAuth', 'Prisma', 'GitHub API', 'OpenAI API'],
    metrics: ['1,000+ commits, pull requests, and CI/CD events', '60% less manual reporting time'],
    categories: ['ai', 'fullstack'],
    problem:
      'Developer activity is distributed across repositories, pull requests, issues, reviews, CI signals, and commits, making status reporting manual.',
    solution:
      'GitHub OAuth and server-side GitHub API synchronization normalize activity and persist snapshots, which power ranked action items, timelines, focus analysis, and grounded weekly summaries.',
    architectureSummary: 'Next.js / NextAuth → GitHub API sync → Prisma snapshots → productivity views / OpenAI summaries',
    architecture: {
      nodes: [
        { id: 'client', label: 'Application', detail: 'Next.js / TypeScript', row: 0, column: 1 },
        { id: 'auth', label: 'Authentication', detail: 'GitHub OAuth / NextAuth', row: 1, column: 0 },
        { id: 'sync', label: 'Activity sync', detail: 'Server-side GitHub API', row: 1, column: 1 },
        { id: 'data', label: 'Persistence', detail: 'Prisma events and sync snapshots', row: 2, column: 1 },
        { id: 'views', label: 'Workflows', detail: 'Action items, timelines, focus, summaries', row: 3, column: 0 },
        { id: 'llm', label: 'Summaries', detail: 'OpenAI API with deterministic fallback', row: 3, column: 2 },
      ],
      edges: [
        { from: 'client', to: 'auth' },
        { from: 'client', to: 'sync' },
        { from: 'sync', to: 'data' },
        { from: 'data', to: 'views' },
        { from: 'data', to: 'llm' },
      ],
    },
    contributed: [
      'Built the Next.js and Prisma application and GitHub OAuth account/workspace workflows.',
      'Implemented server-side synchronization and normalization for repository, pull-request, issue, review, CI, and commit activity.',
      'Added durable sync state and last-known-good snapshots so previously synchronized data remains available during GitHub API outages.',
      'Implemented OpenAI-backed weekly summaries with a deterministic fallback.',
    ],
    challenges: [
      'Normalizing different GitHub signals into coherent action items, timelines, and focus workflows.',
      'Keeping previously synchronized activity usable when an external GitHub request is unavailable.',
      'Providing useful summaries without making the LLM the only path through the product.',
    ],
    impact: [
      'Processes more than 1,000 GitHub commits, pull requests, and CI/CD events.',
      'Reduced manual reporting time by 60%.',
    ],
    validation: [
      'The repository documents typecheck, Vitest, and production build checks.',
      'Repository tests cover account export/deletion, sync snapshots, and pull-request signal filtering.',
      'The Vercel deployment responded successfully when the portfolio project data was last verified.',
    ],
    status: 'Live',
    github: 'https://github.com/Igadsme/DevDash',
    website: 'https://dev-dash-woad.vercel.app',
  },
  {
    id: 'ai-security-investigator',
    title: 'AI Security Investigator',
    subtitle: 'Security Engineering / Applied AI',
    start: 'June 2026',
    end: 'July 2026',
    bullets: [
      'Built video upload and processing workflows using OpenCV, YOLOv8 detection, and configurable tracking.',
      'Implemented investigation search, cases, multi-camera timelines, audit records, evidence exports, and privacy redaction.',
      'Added optional Gemini/Ollama summaries and optional ChromaDB vector search; rule-based and SQL search paths remain available.',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'YOLOv8',
      'OpenCV',
      'Next.js',
      'SQLite (local)',
      'PostgreSQL (optional)',
      'ChromaDB (optional)',
      'Gemini (optional)',
      'Ollama (optional)',
    ],
    metrics: [],
    categories: ['ai', 'computer-vision', 'fullstack'],
    problem:
      'Investigators need to find relevant events across video and camera timelines, then preserve context while reviewing and sharing evidence.',
    solution:
      'A CCTV investigation system processes video into detections, tracks, and events, then exposes search and case workflows through a FastAPI service and Next.js interface.',
    architectureSummary: 'Video → OpenCV / YOLOv8 → tracking and events → FastAPI / SQLAlchemy → investigation workflows',
    architecture: {
      nodes: [
        { id: 'upload', label: 'Video', detail: 'Upload and processing workflows', row: 0, column: 1 },
        { id: 'detection', label: 'Detection', detail: 'OpenCV / YOLOv8', row: 1, column: 0 },
        { id: 'tracking', label: 'Tracking', detail: 'Tracks and event extraction', row: 1, column: 2 },
        { id: 'api', label: 'Service', detail: 'FastAPI / SQLAlchemy', row: 2, column: 1 },
        { id: 'workflows', label: 'Investigation', detail: 'Search, cases, audit, evidence', row: 3, column: 1 },
      ],
      edges: [
        { from: 'upload', to: 'detection' },
        { from: 'upload', to: 'tracking' },
        { from: 'detection', to: 'api' },
        { from: 'tracking', to: 'api' },
        { from: 'api', to: 'workflows' },
      ],
    },
    contributed: [
      'Engineered video upload and processing with YOLOv8 detections and selectable tracking.',
      'Implemented investigation search, cases, multi-camera timelines, and audit records.',
      'Added evidence clip export with a JSON sidecar and SHA-256, redaction, and case-report workflows.',
      'Added optional Gemini/Ollama summaries and optional ChromaDB vector search.',
    ],
    challenges: [
      'Connecting frame-level detections and tracks to timestamped events, multi-camera case timelines, search results, and reviewable evidence.',
      'Keeping optional AI and vector features separate from the rule-based and SQL search paths.',
    ],
    impact: [
      'Implements video investigation, case, timeline, audit, evidence export, and privacy-redaction workflows.',
      'No detection-accuracy or incident-resolution benchmark is claimed.',
    ],
    validation: [
      'The repository includes backend API tests and documents a forensic smoke-test script.',
      'No detection-accuracy or incident-resolution benchmark is claimed.',
      'The documented Hugging Face Space is paused; a working public deployment was not verified.',
    ],
    status: 'Prototype',
    github: 'https://github.com/Igadsme/ai-security-investigator',
  },
  {
    id: 'kynovar',
    title: 'Kynovar',
    subtitle: 'Machine Learning Research / Simulation',
    bullets: [
      'Implemented seeded simulation and laboratory workflows that expose trajectories separately from evaluation-only hidden state.',
      'Added data generation, normalization, splits, training code, and linear, MLP, GRU, and graph-neural-network model families.',
      'Built rollout, benchmark, and out-of-distribution evaluation workflows with run metadata for reproducibility.',
    ],
    technologies: ['Python', 'PyTorch', 'NumPy', 'SciPy', 'SymPy', 'Linear models', 'MLP', 'GRU', 'GNN'],
    metrics: [],
    categories: ['ai', 'research'],
    problem:
      'Studying whether models can infer and revise explanations of unfamiliar physical systems requires controllable worlds and observable evidence.',
    solution:
      'A research system generates controlled simulated universes and trajectory datasets, trains multiple dynamics-model families, and evaluates prediction behavior including out-of-distribution cases.',
    architectureSummary: 'Seeded universe → observable trajectories → dataset and splits → model training → rollout / OOD evaluation',
    architecture: {
      nodes: [
        { id: 'simulator', label: 'Simulator', detail: 'Seeded controlled universe', row: 0, column: 1 },
        { id: 'lab', label: 'Laboratory', detail: 'Observable trajectories', row: 1, column: 1 },
        { id: 'data', label: 'Data tooling', detail: 'Generation, normalization, splits', row: 2, column: 0 },
        { id: 'models', label: 'Model families', detail: 'Linear, MLP, GRU, GNN', row: 2, column: 2 },
        { id: 'evaluation', label: 'Evaluation', detail: 'Rollouts, benchmarks, OOD', row: 3, column: 1 },
      ],
      edges: [
        { from: 'simulator', to: 'lab' },
        { from: 'lab', to: 'data' },
        { from: 'lab', to: 'models' },
        { from: 'data', to: 'models' },
        { from: 'models', to: 'evaluation' },
      ],
    },
    contributed: [
      'Implemented controlled synthetic universes and a laboratory interface for generating observations.',
      'Added dataset generation, normalization, splitting, and OOD utilities.',
      'Implemented trainable linear, MLP, GRU, GNN, and interaction-GNN dynamics models.',
      'Added simulation, training, benchmark, and OOD scripts with recorded run metadata.',
    ],
    challenges: [
      'Separating observable trajectories from hidden simulator state reserved for evaluation.',
      'Keeping model comparisons reproducible through seeded generation, stable splits, and run metadata.',
      'The latest repository status identifies milestone acceptance runs as pending and benchmark results as preliminary.',
    ],
    impact: [
      'Provides reproducible simulator, model-training, rollout, benchmark, and OOD evaluation workflows.',
      'Research milestones and benchmark results remain preliminary.',
    ],
    validation: [
      'A pytest suite covers simulator, data, models, evaluation, and reproducibility paths.',
      'The latest repository status says no milestone has passed its sequential, uncontended acceptance run; benchmark results remain preliminary.',
    ],
    status: 'Research',
    github: 'https://github.com/Igadsme/Kynovar',
  },
]
