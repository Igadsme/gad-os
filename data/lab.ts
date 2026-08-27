export type LabStatus = "Research" | "Prototype" | "In Progress";

export type LabExperiment = {
  slug: string;
  title: string;
  status: LabStatus;
  hypothesis: string;
  methods: string[];
  progress: number;
  relatedProjectSlug?: string;
  relatedExperienceId?: string;
};

export const labStatuses: Array<LabStatus | "All"> = [
  "All",
  "Research",
  "Prototype",
  "In Progress",
];

export const labExperiments: LabExperiment[] = [
  {
    slug: "rag-evaluation",
    title: "RAG Evaluation System",
    status: "In Progress",
    hypothesis:
      "Retrieval quality for the Headstarter semantic-search work can be measured with ranked results and user-behavior signals instead of anecdote.",
    methods: ["RAG", "Pinecone", "Embeddings", "Gemini API"],
    progress: 62,
    relatedProjectSlug: "headstarter-rag",
    relatedExperienceId: "headstarter",
  },
  {
    slug: "cv-cctv-search",
    title: "CCTV Semantic Search",
    status: "Prototype",
    hypothesis:
      "YOLOv8 detections plus embeddings over footage metadata can return timestamped, ranked investigation results faster than linear review.",
    methods: ["YOLOv8", "FastAPI", "Embeddings", "PyTorch"],
    progress: 78,
    relatedProjectSlug: "ai-security-camera-investigator",
  },
  {
    slug: "sentinel-schema-checks",
    title: "Sentinel Ingestion Accuracy",
    status: "Research",
    hypothesis:
      "KQL schema checks and cross-source correlation catch malformed non-native telemetry before it lands in detection tables.",
    methods: ["KQL", "Microsoft Sentinel", "CEF", "Log Analytics"],
    progress: 54,
    relatedProjectSlug: "sentinel-ingestion",
    relatedExperienceId: "shaw",
  },
];
