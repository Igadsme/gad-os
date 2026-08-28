import { describe, expect, it } from "vitest";
import { experience } from "@/data/experience";
import { getFeaturedProjects, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";

describe("résumé-backed data", () => {
  it("uses the résumé email and school", () => {
    expect(profile.email).toBe("gad.imani@yahoo.com");
    expect(profile.education.school).toBe("Kennesaw State University");
  });

  it("includes only employers from the résumé", () => {
    expect(experience.map((role) => role.company).sort()).toEqual(
      [
        "Headstarter AI",
        "Lutheran Service School",
        "Shaw Industries",
        "TrueSpice Foods",
        "UpCancer",
        "Wellstar Health System",
      ].sort(),
    );
  });

  it("includes the five visual projects with their repositories", () => {
    expect(
      Object.fromEntries(projects.map((project) => [project.slug, project.repoUrl])),
    ).toMatchObject({
      devdash: "https://github.com/Igadsme/DevDash",
      nestai: "https://github.com/Igadsme/nestai_cli_project",
      "ai-security-camera-investigator":
        "https://github.com/Igadsme/ai-security-investigator",
      hiveu: "https://github.com/Igadsme/HIVEU",
      "ai-recruiter-assistant":
        "https://github.com/Igadsme/ai-recruiter-assistant",
    });
  });

  it("keeps Featured Work in the requested order without duplicates", () => {
    const featured = getFeaturedProjects().map((project) => project.title);
    expect(featured).toEqual([
      "DevDash",
      "NestAI",
      "VeriSight — AI Security Camera Investigator",
    ]);
    expect(new Set(featured).size).toBe(featured.length);
  });

  it("excludes projects removed from the public project list", () => {
    expect(projects.map((project) => project.slug)).not.toEqual(
      expect.arrayContaining([
        "servicenow-itsm",
        "headstarter-rag",
        "upcancer-microservices",
        "truespice-web",
      ]),
    );
  });

  it("lists Python as a language skill", () => {
    expect(skills.some((skill) => skill.name === "Python")).toBe(true);
  });
});
