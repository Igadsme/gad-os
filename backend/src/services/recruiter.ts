import {
  differentiators,
  education,
  experience,
  projects,
  recruiterBrief,
} from '../data/candidate/index.ts'
import type { DifferentiatorGroup, ProjectDeepDive, RecruiterSummary, Source, StrengthLevel } from '../types.ts'

export function buildFollowUps(query: string, sources: Source[]): string[] {
  const options: string[] = []
  const asked = query.toLowerCase()
  const sourceIds = new Set(sources.map((source) => source.id))
  const hasEvidence = (prefix: string) => [...sourceIds].some((id) => id === prefix || id.startsWith(`${prefix}:`))

  const add = (prompt: string) => {
    if (!prompt) return
    if (asked.includes(prompt.toLowerCase().slice(0, 24))) return
    if (options.includes(prompt)) return
    options.push(prompt)
  }

  if (/\b(ai|machine learning|\bml\b|llm|rag|embedding|computer vision|yolo)\b/i.test(query)) {
    if (hasEvidence('experience:headstarter')) add('Tell me more about his Headstarter AI fellowship')
    if (hasEvidence('project:kynovar')) add('How does Kynovar compare and evaluate machine-learning models?')
    if (hasEvidence('project:ai-security-investigator')) {
      add('How does AI Security Investigator connect video detection and investigation search?')
    }
    if (hasEvidence('skill:ai')) add('How has he used RAG, vector embeddings, and Pinecone?')
    if (hasEvidence('project:devdash')) add('How does DevDash use LLMs with GitHub activity?')
    return options.slice(0, 4)
  }

  if (/neighborly/i.test(query) && hasEvidence('project:neighborly')) {
    add('Walk through Neighborly’s client-to-API architecture')
    add('Which Neighborly marketplace and trust/safety flows are implemented?')
    add('What remains before Neighborly can launch?')
    return options.slice(0, 4)
  }
  if (/devdash/i.test(query) && hasEvidence('project:devdash')) {
    add('Walk through DevDash’s GitHub sync and Prisma data flow')
    add('How does DevDash rank action items and summarize activity?')
    add('What does DevDash do when GitHub or OpenAI is unavailable?')
    return options.slice(0, 4)
  }
  if (/kynovar/i.test(query) && hasEvidence('project:kynovar')) {
    add('Which model families does Kynovar compare?')
    add('How does Kynovar evaluate out-of-distribution behavior?')
    add('Which Kynovar benchmark results are still preliminary?')
    return options.slice(0, 4)
  }
  if (/cyber|security|sentinel|shaw/i.test(query) && hasEvidence('experience:shaw')) {
    add('How did he build and validate the Microsoft Sentinel ingestion pipelines?')
    add('What role did the Palo Alto CEF/syslog pipeline play?')
    if (hasEvidence('project:ai-security-investigator')) {
      add('How does AI Security Investigator preserve investigation evidence?')
    }
    return options.slice(0, 4)
  }
  if (/leadership|mentor|andy 8|mission bit/i.test(query)) {
    if (hasEvidence('activity:leadership:andy8')) add('What does he coordinate for ANDY 8?')
    if (hasEvidence('activity:leadership:mission-bit')) add('Tell me about his Mission Bit mentoring')
    if (hasEvidence('experience:lutheran')) add('How did his Python teaching at Lutheran Service School work?')
    return options.slice(0, 4)
  }

  for (const source of sources) {
    if (source.type === 'project') add(`Tell me about ${source.title}`)
    if (source.type === 'experience' && source.organization) {
      add(`What did he build at ${source.organization}?`)
    }
  }

  if (hasEvidence('experience:upcancer') || hasEvidence('experience:wellstar')) {
    add('What backend experience does he have?')
  }
  if (hasEvidence('project:devdash') || hasEvidence('experience:headstarter')) {
    add('What AI projects has Imani worked on?')
  }
  add('Why should I interview Imani Gad?')
  add('When does he graduate?')

  return options.slice(0, 4)
}

export function buildRecruiterSummary(sources: Source[]): RecruiterSummary {
  const tech = sources.flatMap((source) => source.technologies ?? []).join(' ')
  const titles = sources.map((source) => `${source.organization ?? ''} ${source.title}`).join(' ')

  return {
    relevantExperience: experience.length >= 5 ? 'High' : 'Moderate',
    aiExperience: levelFrom(
      /headstarter|devdash|camera|pinecone|gemini|openai|yolo|rag/i.test(`${titles} ${tech}`),
      /ai|ml/i.test(tech),
    ),
    backendExperience: levelFrom(
      /upcancer|postgresql|redis|fastapi|servicenow|wellstar/i.test(`${titles} ${tech}`),
      /api|node/i.test(tech),
    ),
    frontendExperience: levelFrom(
      /truespice|react|next\.js/i.test(`${titles} ${tech}`),
      /css|html/i.test(tech),
    ),
    education: `CS — ${education.school.replace(' University', '')}`,
    graduation: education.expectedGraduation.replace('December', 'Dec.'),
    suggestedInterviewTopics: [
      'Python/TypeScript services and Redis-cached PostgreSQL at UpCancer',
      'RAG / Pinecone / Gemini work from the Headstarter fellowship',
      'DevDash: GitHub ingestion plus LLM summarization',
      'Teaching Python to 25 students at Lutheran Service School',
    ],
  }
}

function levelFrom(strong: boolean, moderate: boolean): StrengthLevel {
  if (strong) return 'Strong'
  if (moderate) return 'Moderate'
  return 'Limited'
}

export function buildDifferentiatorGroups(): DifferentiatorGroup[] {
  return [
    {
      heading: 'Technical',
      items: differentiators.technical.map((item) => ({
        label: item.label,
        evidence: item.evidence,
        sourceIds: [...item.sourceIds],
      })),
    },
    {
      heading: 'Builder',
      items: differentiators.builder.map((item) => ({
        label: item.label,
        evidence: item.evidence,
        sourceIds: [...item.sourceIds],
      })),
    },
    {
      heading: 'Communication',
      items: differentiators.communication.map((item) => ({
        label: item.label,
        evidence: item.evidence,
        sourceIds: [...item.sourceIds],
      })),
    },
  ]
}

export function toProjectDeepDive(projectId: string): ProjectDeepDive | undefined {
  const project = projects.find((item) => item.id === projectId)
  if (!project) return undefined
  return {
    id: project.id,
    title: project.title,
    subtitle: project.subtitle,
    problem: project.problem,
    solution: project.solution,
    architectureSummary: project.architectureSummary,
    architecture: project.architecture,
    contributed: [...project.contributed],
    challenges: [...project.challenges, ...(project.sourceNotes ?? [])],
    impact: [...project.impact],
    technologies: [...project.technologies],
    github: project.github,
    website: project.website,
  }
}

export function briefPayload() {
  return recruiterBrief
}
