export const differentiators = {
  technical: [
    {
      label: 'Full-stack development',
      evidence: 'Neighborly’s current repository uses a React/Vite client with a NestJS, Prisma, and PostgreSQL backend; the updated resume lists Next.js for Neighborly, so the frontend discrepancy remains unresolved. DevDash uses Next.js, Prisma, and GitHub integrations; TrueSpice used React; UpCancer used TypeScript services.',
      sourceIds: ['project:neighborly', 'project:devdash', 'experience:truespice', 'experience:upcancer'],
    },
    {
      label: 'AI / LLM integration',
      evidence: 'OpenAI summarization on DevDash; RAG, Pinecone, and Gemini at Headstarter AI; YOLOv8 video analysis and optional semantic search on AI Security Investigator; simulation research on Kynovar.',
      sourceIds: ['project:devdash', 'experience:headstarter', 'project:ai-security-investigator', 'project:kynovar'],
    },
    {
      label: 'Backend / API development',
      evidence: 'Python and TypeScript microservices with Redis-cached PostgreSQL at UpCancer; ServiceNow REST API integrations at Wellstar; NestJS/Prisma/PostgreSQL on Neighborly; FastAPI on AI Security Investigator.',
      sourceIds: ['experience:upcancer', 'experience:wellstar', 'project:neighborly', 'project:ai-security-investigator'],
    },
    {
      label: 'Cloud / deployment experience',
      evidence: 'AWS, Azure, and Docker are listed skills. Azure Log Analytics is used in the verified Shaw co-op evidence; production cloud architecture beyond those facts is not established.',
      sourceIds: ['skill:tools', 'experience:shaw'],
    },
  ],
  builder: [
    {
      label: 'Independently developed projects',
      evidence: 'Neighborly, DevDash, AI Security Investigator, and Kynovar are projects, not employment.',
      sourceIds: ['project:neighborly', 'project:devdash', 'project:ai-security-investigator', 'project:kynovar'],
    },
    {
      label: 'AI-powered applications',
      evidence: 'Five AI applications during the Headstarter fellowship, plus LLM functionality in DevDash, optional AI and vector-search workflows in AI Security Investigator, and model research in Kynovar.',
      sourceIds: ['experience:headstarter', 'project:devdash', 'project:ai-security-investigator', 'project:kynovar'],
    },
    {
      label: 'Developer tooling',
      evidence: 'DevDash processes more than 1,000 GitHub commits, pull requests, and CI/CD events and reduced manual reporting time by 60%.',
      sourceIds: ['project:devdash'],
    },
  ],
  communication: [
    {
      label: 'Coding instruction / mentoring',
      evidence: 'Taught Python to 25+ students at Lutheran Service School and mentored 15 high school students through Mission Bit.',
      sourceIds: ['experience:lutheran', 'activity:leadership:mission-bit'],
    },
    {
      label: 'Explaining technical concepts',
      evidence: 'Adapted project-based Python lessons for students with limited English fluency and mentored students through coding projects.',
      sourceIds: ['experience:lutheran', 'activity:leadership:mission-bit'],
    },
  ],
} as const
