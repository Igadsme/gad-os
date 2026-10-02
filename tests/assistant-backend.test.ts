import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { createApp } from "../backend/src/app.ts";
import {
  setLlmClientForTests,
  type GenerateChatInput,
} from "../backend/src/services/gemini.ts";
import { resetConversationsForTests } from "../backend/src/services/conversation.ts";

const app = createApp();

beforeEach(() => {
  resetConversationsForTests();
  setLlmClientForTests(null);
});

afterEach(() => {
  resetConversationsForTests();
  setLlmClientForTests(null);
  vi.restoreAllMocks();
});

describe("co-hosted recruiter assistant API", () => {
  it("serves candidate context and timeline from the original backend data", async () => {
    const [brief, timeline] = await Promise.all([
      request(app).get("/api/candidate/brief"),
      request(app).get("/api/candidate/timeline"),
    ]);

    expect(brief.status).toBe(200);
    expect(brief.body.brief).toMatchObject({ candidate: "Imani Gad" });
    expect(timeline.status).toBe(200);
    expect(timeline.body.timeline.length).toBeGreaterThan(0);
  });

  it("creates and restores conversation IDs and session data", async () => {
    const created = await request(app).post("/api/conversations").expect(201);
    expect(created.body.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );

    const restored = await request(app)
      .get(`/api/conversations/${created.body.id}`)
      .expect(200);
    expect(restored.body).toMatchObject({
      id: created.body.id,
      messages: [],
      session: { questionsAsked: 0, exploring: "Overview" },
    });
  });

  it("validates requests and returns Gemini-generated answers with grounded context and history", async () => {
    const inputs: GenerateChatInput[] = [];
    setLlmClientForTests({
      async generate(input) {
        inputs.push(input);
        return {
          intro: "Imani has software engineering experience across internships and projects.",
          sections: [],
          claims: [],
        };
      },
    });

    await request(app)
      .post("/api/chat")
      .send({ message: " " })
      .expect(400)
      .expect(({ body }) => {
        expect(body.error.code).toBe("validation_error");
      });

    const first = await request(app)
      .post("/api/chat")
      .send({ message: "What is Imani's software engineering experience?", mode: "general" })
      .expect(200);
    expect(first.body.message).toContain("software engineering experience");
    expect(first.body.conversationId).toMatch(/^[0-9a-f-]{36}$/i);
    expect(inputs[0].context).toContain("Wellstar");

    const second = await request(app)
      .post("/api/chat")
      .send({
        message: "What about his backend work?",
        mode: "recruiter",
        conversationId: first.body.conversationId,
      })
      .expect(200);
    expect(second.body.conversationId).toBe(first.body.conversationId);
    expect(inputs[1].mode).toBe("recruiter");
    expect(inputs[1].history.length).toBeGreaterThan(0);
  });

  it("sends broad candidate introductions through retrieval and the configured model", async () => {
    const inputs: GenerateChatInput[] = [];
    setLlmClientForTests({
      async generate(input) {
        inputs.push(input);
        return {
          intro: "Imani is a Computer Science student at Kennesaw State University expected to graduate in December 2026. At Wellstar, he built ServiceNow workflows and REST API integrations.",
          sections: [],
          claims: [
            {
              text: "Imani is a Computer Science student at Kennesaw State University expected to graduate in December 2026.",
              sourceIds: ["education:ksu"],
            },
            {
              text: "At Wellstar, he built ServiceNow workflows and REST API integrations.",
              sourceIds: ["experience:wellstar"],
            },
          ],
        };
      },
    });

    const response = await request(app)
      .post("/api/chat")
      .send({ message: "Tell me about Imani Gad.", mode: "general" })
      .expect(200);

    expect(response.body.intent).toBe("introduction");
    expect(response.body.conversational).toBe(false);
    expect(response.body.message).toContain("ServiceNow workflows");
    expect(response.body.sources.length).toBeGreaterThanOrEqual(5);
    expect(inputs[0].context).toContain("experience:wellstar");
    expect(inputs[0].context).toContain("activity:leadership:andy8");
  });

  it("returns a friendly provider error when the server-side Gemini key is missing", async () => {
    vi.stubEnv("GEMINI_API_KEY", "");

    const response = await request(app)
      .post("/api/chat")
      .send({ message: "What is Imani's software engineering experience?" })
      .expect(503);

    expect(response.body.error).toMatchObject({
      code: "gemini_unavailable",
      message: "The assistant is temporarily unavailable.",
    });
  });

  it("keeps fit and interview workflows available through the same API", async () => {
    const [fit, tracks] = await Promise.all([
      request(app)
        .post("/api/fit")
        .send({ jobDescription: "Software engineer role requiring Python, React, and PostgreSQL APIs" }),
      request(app).get("/api/interview/tracks"),
    ]);

    expect(fit.status).toBe(200);
    expect(fit.body.analysis.requirementMatrix.length).toBeGreaterThan(0);
    expect(tracks.status).toBe(200);
    expect(tracks.body.tracks.some((track: { id: string }) => track.id === "backend")).toBe(true);
  });
});
