import { beforeEach, describe, expect, it, vi } from 'vitest'

const { generateContent } = vi.hoisted(() => ({
  generateContent: vi.fn(),
}))

vi.mock('@google/genai', () => ({
  GoogleGenAI: class {
    models = { generateContent }
  },
}))

import { GeminiClient } from '../backend/src/services/gemini.ts'

beforeEach(() => {
  generateContent.mockReset()
})

describe('Gemini response depth configuration', () => {
  it('gives broad questions substantive instructions and enough output budget', async () => {
    generateContent.mockResolvedValue({
      text: JSON.stringify({
        intro: 'Headstarter AI is one documented part of Imani’s AI experience.',
        claims: [
          {
            text: 'Headstarter AI is one documented part of Imani’s AI experience.',
            sourceIds: ['experience:headstarter'],
          },
        ],
      }),
    })

    const client = new GeminiClient('test-fixture-not-a-secret')
    await client.generate({
      message: 'What AI experience does Imani have?',
      mode: 'general',
      context: 'EXPERIENCE · Software Engineering Fellow — Headstarter AI\nSource id: experience:headstarter',
      history: [],
      verified: true,
    })

    const request = generateContent.mock.calls[0][0]
    expect(request.config.maxOutputTokens).toBe(6000)
    expect(request.config.systemInstruction).toContain('Match the answer to the breadth of the question')
    expect(request.config.systemInstruction).not.toContain('concise')
    expect(request.contents[0].parts[0].text).toContain(
      'This is a broad question. Synthesize the relevant evidence',
    )
    expect(request.contents[0].parts[0].text).not.toContain('one or two natural sentences')
  })
})
