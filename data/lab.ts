export type LabStatus =
  | "Proposed"
  | "Researching"
  | "Prototype"
  | "In Progress"
  | "Completed";

export type LabExperiment = {
  slug: string;
  title: string;
  status: LabStatus;
  hypothesis: string;
  methods: string[];
  stageLabel: string;
  relatedProjectSlug?: string;
  relatedExperienceId?: string;
};

export const labStatuses: Array<LabStatus | "All"> = [
  "All",
  "Proposed",
  "Researching",
  "Prototype",
  "In Progress",
  "Completed",
];

export const labExperiments: LabExperiment[] = [
  {
    slug: "rag-evaluation",
    title: "RAG Evaluation System",
    status: "In Progress",
    hypothesis:
      "Retrieval quality for the Headstarter semantic-search work can be measured with ranked results and usage signals instead of anecdote.",
    methods: ["RAG", "Pinecone", "Embeddings", "Gemini API"],
    stageLabel: "Evaluation harness",
    relatedExperienceId: "headstarter",
  },
  {
    slug: "cv-cctv-search",
    title: "CCTV Semantic Search",
    status: "Prototype",
    hypothesis:
      "YOLOv8 detections plus embeddings over footage metadata can return timestamped, ranked investigation results faster than linear review.",
    methods: ["YOLOv8", "FastAPI", "Embeddings", "PyTorch"],
    stageLabel: "Working pipeline",
    relatedProjectSlug: "ai-security-camera-investigator",
  },
  {
    slug: "sentinel-schema-checks",
    title: "Sentinel Ingestion Accuracy",
    status: "Completed",
    hypothesis:
      "KQL schema checks and cross-source correlation catch malformed non-native telemetry before it lands in detection tables.",
    methods: ["KQL", "Microsoft Sentinel", "CEF", "Log Analytics"],
    stageLabel: "Validated at Shaw",
    relatedProjectSlug: "sentinel-ingestion",
    relatedExperienceId: "shaw",
  },
  {
    slug: "deep-learning-comparisons",
    title: "Deep Learning Model Comparisons",
    status: "Proposed",
    hypothesis:
      "Coursework in Machine Learning and Deep Learning can be turned into a repeatable comparison of model families on a fixed evaluation set.",
    methods: ["PyTorch", "TensorFlow", "NumPy", "Pandas"],
    stageLabel: "Coursework-backed proposal",
  },
  {
    slug: "machine-unlearning",
    title: "Machine Unlearning Laboratory",
    status: "Proposed",
    hypothesis:
      "Planned lab: test whether a trained retrieval or vision model can forget a specified subset without a full retrain.",
    methods: ["PyTorch", "Embeddings"],
    stageLabel: "Proposed research",
  },
  {
    slug: "multi-agent-cyber",
    title: "Multi-Agent Cybersecurity Simulation",
    status: "Proposed",
    hypothesis:
      "Planned lab: simulate attacker/defender agents against the kinds of telemetry pipelines used in the Shaw Sentinel work.",
    methods: ["Python", "KQL", "Microsoft Sentinel"],
    stageLabel: "Proposed research",
    relatedExperienceId: "shaw",
  },
];
