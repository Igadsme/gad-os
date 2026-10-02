import { describe, expect, it } from 'vitest'
import {
  activities,
  education,
  experience,
  leadership,
  projects,
  skills,
} from '../backend/src/data/candidate/index.ts'
import {
  classifyRetrievalDepth,
  retrieveCandidateContext,
} from '../backend/src/services/retrieval.ts'
import { buildFollowUps, toProjectDeepDive } from '../backend/src/services/recruiter.ts'

const broadQuestions = [
  {
    question: 'Tell me about Imani Gad.',
    expected: ['education:ksu', 'profile:imani', 'experience:headstarter'],
  },
  {
    question: "Tell me about Imani's software engineering experience.",
    expected: ['experience:wellstar', 'experience:upcancer', 'project:neighborly', 'project:devdash'],
  },
  {
    question: 'What AI experience does Imani have?',
    expected: [
      'experience:headstarter',
      'project:devdash',
      'project:ai-security-investigator',
      'project:kynovar',
      'skill:ai',
    ],
  },
  {
    question: 'Tell me everything about Neighborly.',
    expected: ['project:neighborly', 'skill:databases', 'skill:frameworks'],
  },
  {
    question: 'Explain DevDash in detail.',
    expected: ['project:devdash', 'skill:frameworks'],
  },
  {
    question: 'What backend experience does Imani have?',
    expected: ['experience:upcancer', 'experience:wellstar', 'project:neighborly'],
  },
  {
    question: 'What cybersecurity experience does Imani have?',
    expected: ['experience:shaw', 'project:ai-security-investigator', 'skill:security'],
  },
  {
    question: 'What cloud experience does Imani have?',
    expected: ['skill:tools', 'experience:shaw'],
  },
  {
    question: 'What leadership experience does Imani have?',
    expected: [
      'activity:leadership:andy8',
      'activity:leadership:mission-bit',
      'experience:lutheran',
      'activity:hackathons',
    ],
  },
  {
    question: 'What technologies does Imani know?',
    expected: ['skill:languages', 'skill:frameworks', 'skill:databases', 'skill:ai'],
  },
  {
    question: "Tell me about Imani's projects.",
    expected: [
      'project:neighborly',
      'project:devdash',
      'project:ai-security-investigator',
      'project:kynovar',
    ],
  },
]

function includesSource(sources: Array<{ id: string }>, prefix: string): boolean {
  return sources.some((source) => source.id === prefix || source.id.startsWith(`${prefix}:`))
}

describe('resume-backed candidate knowledge and query-aware retrieval', () => {
  it.each(broadQuestions)('covers relevant evidence for "$question"', async ({ question, expected }) => {
    const result = await retrieveCandidateContext(question)

    expect(result.depth).toBe('broad')
    expect(result.sources.length).toBeGreaterThanOrEqual(5)
    expect(result.sources.length).toBeLessThanOrEqual(12)
    for (const sourceId of expected) {
      expect(includesSource(result.sources, sourceId), `${question} should retrieve ${sourceId}`).toBe(true)
    }
    expect(result.context).not.toBe('')
  })

  it('keeps direct factual questions narrow and retrieves the authoritative graduation date', async () => {
    const result = await retrieveCandidateContext('When does Imani graduate?')

    expect(classifyRetrievalDepth('When does Imani graduate?')).toBe('narrow')
    expect(result.depth).toBe('narrow')
    expect(result.sources.length).toBeGreaterThanOrEqual(1)
    expect(result.sources.length).toBeLessThanOrEqual(3)
    expect(includesSource(result.sources, 'education:ksu')).toBe(true)
    expect(result.context).toContain('December 2026')
  })

  it('carries the unresolved Neighborly frontend-stack distinction with every project source', async () => {
    const result = await retrieveCandidateContext('Tell me everything about Neighborly.')
    const neighborlySources = result.sources.filter((source) => source.id.startsWith('project:neighborly'))

    expect(neighborlySources.length).toBeGreaterThan(0)
    for (const source of neighborlySources) {
      expect(source.relevantExcerpt).toContain('resume lists Next.js')
      expect(source.relevantExcerpt).toContain('React with Vite')
      expect(source.relevantExcerpt).toContain('do not claim they are the same version')
    }
    expect(toProjectDeepDive('neighborly')?.challenges.join(' ')).toContain('source mismatch is unresolved')
  })

  it.each([
    ['What did Imani do at Wellstar?', 'experience:wellstar'],
    ['What did Imani do at Shaw?', 'experience:shaw'],
  ])('retrieves the named role for the focused question "%s"', async (question, sourceId) => {
    const result = await retrieveCandidateContext(question)

    expect(result.depth).toBe('medium')
    expect(result.sources.length).toBeLessThanOrEqual(7)
    expect(includesSource(result.sources, sourceId)).toBe(true)
  })

  it('answers what he studies from education evidence without broad retrieval', async () => {
    const result = await retrieveCandidateContext('What is Imani studying?')

    expect(result.depth).toBe('narrow')
    expect(includesSource(result.sources, 'education:ksu')).toBe(true)
    expect(result.context).toContain('Machine Learning')
    expect(result.context).toContain('Deep Learning')
  })

  it('uses the current resume facts and removes conflicting candidate values', () => {
    expect(education.expectedGraduation).toBe('December 2026')
    expect(experience.find((role) => role.id === 'wellstar')).toMatchObject({
      role: 'Platform Applications Intern',
      start: 'November 2025',
      end: 'July 2026',
      metrics: ['80% → 20% unresolved backlog rate', '200–600 tickets'],
    })
    expect(experience.find((role) => role.id === 'shaw')).toMatchObject({
      role: 'Cybersecurity Co-op',
      start: 'January 2026',
      end: 'June 2026',
    })
    expect(activities.hackathons).toMatchObject({ participations: 13, wins: 6 })
    expect(activities.awards).toEqual(['3x Dean’s List', '2x President’s List'])
    expect(activities.organizations).toEqual(['SHPE', 'KSU AI Club', 'KSU ColorStack'])
    expect(leadership.map((item) => item.id)).toEqual(['andy8', 'mission-bit'])
    expect(skills.languages).toEqual(['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'C++', 'C#'])

    const devdash = projects.find((project) => project.id === 'devdash')
    expect(devdash?.metrics).toContain('60% less manual reporting time')
    expect(devdash?.metrics.some((metric) => metric.includes('80%'))).toBe(false)
    expect(projects.map((project) => project.id)).toEqual([
      'neighborly',
      'devdash',
      'ai-security-investigator',
      'kynovar',
    ])
  })

  it('returns topic-specific AI follow-ups from the retrieved project and fellowship evidence', async () => {
    const retrieval = await retrieveCandidateContext('What AI experience does Imani have?')
    const followUps = buildFollowUps('What AI experience does Imani have?', retrieval.sources)

    expect(followUps).toContain('Tell me more about his Headstarter AI fellowship')
    expect(followUps.some((item) => item.includes('Kynovar'))).toBe(true)
    expect(followUps.some((item) => item.includes('AI Security Investigator'))).toBe(true)
    expect(followUps.some((item) => item.includes('RAG, vector embeddings, and Pinecone'))).toBe(true)
    expect(followUps).toHaveLength(4)
  })
})
