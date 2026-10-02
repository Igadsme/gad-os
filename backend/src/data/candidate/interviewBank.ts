export type InterviewTrack = 'behavioral' | 'java' | 'python' | 'backend' | 'ai' | 'system-design'

export type InterviewQuestion = {
  id: string
  track: InterviewTrack
  prompt: string
  followUps: string[]
  sourceId?: string
}

export const interviewTracks: { id: InterviewTrack; label: string; blurb: string }[] = [
  { id: 'behavioral', label: 'Behavioral', blurb: 'Teaching, mentoring, project coordination, and hackathon teamwork.' },
  { id: 'java', label: 'Java', blurb: 'Language listed in his skills — not tied to a specific job.' },
  { id: 'python', label: 'Python', blurb: 'Teaching, UpCancer services, Headstarter, AI Security Investigator, and Kynovar.' },
  { id: 'backend', label: 'Backend', blurb: 'APIs, PostgreSQL, Redis, ServiceNow, NestJS, and FastAPI.' },
  { id: 'ai', label: 'AI / ML', blurb: 'RAG, embeddings, Gemini, OpenAI, YOLOv8, and simulation research.' },
  { id: 'system-design', label: 'System design', blurb: 'Walk through Neighborly, DevDash, or AI Security Investigator.' },
]

export const interviewBank: InterviewQuestion[] = [
  {
    id: 'behavioral-lutheran',
    track: 'behavioral',
    prompt:
      'You mentored 25 students in Python at Lutheran Service School, including students with limited English. Walk through how you explained a concept when language itself was the blocker.',
    followUps: [
      'What did you change after watching a student go from hesitant to presenting their own project?',
      'How does that teaching work show up when you explain a system to teammates now?',
    ],
    sourceId: 'experience:lutheran',
  },
  {
    id: 'behavioral-hackathon',
    track: 'behavioral',
    prompt:
      'You have 13 hackathon participations and 6 wins, including a second-place result among 32 teams at NestAI. Tell me about a time the plan broke and your team still shipped.',
    followUps: [
      'How did you divide work on that team?',
      'What would you drop first if you had to cut scope again?',
    ],
    sourceId: 'activity:hackathons',
  },
  {
    id: 'java-skills',
    track: 'java',
    prompt:
      'Java is on Imani’s verified language list, but none of the internships list Java as a job technology. Where has he actually used Java, and how would he compare it to the Python and TypeScript he used at UpCancer?',
    followUps: [
      'What would you not claim about his Java experience based on the verified profile?',
      'If a role is Java-heavy, what evidence is missing from the candidate file?',
    ],
    sourceId: 'skill:languages',
  },
  {
    id: 'python-upcancer',
    track: 'python',
    prompt:
      'At UpCancer you built Python and TypeScript microservices on Redis-cached PostgreSQL and saw +15% throughput and −20% latency. Walk through the service boundaries and where Redis sat in that path.',
    followUps: [
      'What was cached, and what still had to hit PostgreSQL?',
      'How did you and frontend engineers agree on the REST contracts?',
    ],
    sourceId: 'experience:upcancer',
  },
  {
    id: 'python-fastapi',
    track: 'python',
    prompt:
      'AI Security Investigator uses FastAPI and YOLOv8 for video investigation workflows. How does a request move from video processing through persisted detections to case review?',
    followUps: [
      'Where do embeddings live relative to the detector?',
      'What happens when detection confidence is low?',
    ],
    sourceId: 'project:ai-security-investigator',
  },
  {
    id: 'backend-upcancer',
    track: 'backend',
    prompt:
      'You mentioned building DevDash — actually, start with production backend work. At UpCancer, how did Python/TypeScript services, PostgreSQL, and Redis fit together?',
    followUps: [
      'How would you have designed that if the read path grew 10×?',
      'What did you document in the REST API contracts?',
    ],
    sourceId: 'experience:upcancer',
  },
  {
    id: 'backend-wellstar',
    track: 'backend',
    prompt:
      'At Wellstar you built ServiceNow REST integrations and automated workflows supporting 200–600 tickets, reducing the unresolved backlog rate from 80% to 20%. Walk through the documented workflow components.',
    followUps: [
      'What made a ticket eligible for automation vs human review?',
      'How did you test Script Includes and business rules safely?',
    ],
    sourceId: 'experience:wellstar',
  },
  {
    id: 'ai-devdash',
    track: 'ai',
    prompt:
      'DevDash processes more than 1,000 commits, pull requests, and CI/CD events and uses OpenAI-powered summaries and task prioritization. Walk through that data path and how reporting time changed.',
    followUps: [
      'What did you send to the model, and what did you keep deterministic?',
      'How was the 60% reduction in manual reporting time measured?',
    ],
    sourceId: 'project:devdash',
  },
  {
    id: 'ai-headstarter',
    track: 'ai',
    prompt:
      'During the Headstarter AI fellowship you built 5 AI projects with Pinecone, Gemini, embeddings, and RAG. Pick one and explain the retrieval path: query → embedding → Pinecone → generation.',
    followUps: [
      'What did you store in Pinecone, and what did you leave out?',
      'How did you evaluate whether the retrieved chunks were actually relevant?',
    ],
    sourceId: 'experience:headstarter',
  },
  {
    id: 'ai-camera',
    track: 'ai',
    prompt:
      'For AI Security Investigator, explain how YOLOv8 video detections, tracking, and the optional semantic-search path relate to investigation results.',
    followUps: [
      'What is in the metadata you embed?',
      'How are results ranked?',
    ],
    sourceId: 'project:ai-security-investigator',
  },
  {
    id: 'design-devdash',
    track: 'system-design',
    prompt:
      'You mentioned building DevDash. Walk me through the system architecture: Next.js, Prisma, GitHub APIs, and the OpenAI API. Draw the request path for “summarize what shipped this week.”',
    followUps: [
      'Why Prisma there instead of talking to GitHub on every page load?',
      'Where does this design break if GitHub rate-limits you?',
    ],
    sourceId: 'project:devdash',
  },
  {
    id: 'design-camera',
    track: 'system-design',
    prompt:
      'Design AI Security Investigator from the repository evidence: video processing, YOLOv8, tracking, FastAPI, and persisted case data. What is implemented, and which AI search paths are optional?',
    followUps: [
      'Would you run detection on upload, on query, or both?',
      'How would you keep search results timestamped and ranked as footage volume grows?',
    ],
    sourceId: 'project:ai-security-investigator',
  },
  {
    id: 'design-neighborly',
    track: 'system-design',
    prompt:
      'The updated resume lists Next.js for Neighborly, while the current repository uses a React/TypeScript/Vite client with NestJS, Prisma, and PostgreSQL. Clarify which version you worked on, then walk through its client-to-API flow and how authentication and trust/safety responsibilities are separated.',
    followUps: [
      'Which marketplace flows are implemented in the client?',
      'What remains before the product can launch?',
    ],
    sourceId: 'project:neighborly',
  },
  {
    id: 'ai-kynovar',
    track: 'ai',
    prompt:
      'Kynovar is a research system for training and comparing dynamics models in controlled simulated universes. Explain how its seeded simulations, observable trajectories, model families, and OOD evaluation fit together.',
    followUps: [
      'How does the system prevent hidden evaluation state from leaking into training?',
      'Which benchmark results are still preliminary?',
    ],
    sourceId: 'project:kynovar',
  },
]
