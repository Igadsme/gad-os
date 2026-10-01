import { describe, expect, it } from "vitest";
import { experience } from "@/data/experience";
import { getFeaturedProjects, getOrderedProjects, getProjectBySlug, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";

describe("résumé-backed data", () => {
  it("uses the résumé email and school", () => {
    expect(profile.email).toBe("gadimani@outlook.com");
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

  it("includes the established projects with their repositories", () => {
    expect(
      Object.fromEntries(projects.map((project) => [project.slug, project.repoUrl])),
    ).toMatchObject({
      neighborly: "https://github.com/Igadsme/neighborly",
      devdash: "https://github.com/Igadsme/DevDash",
      nestai: "https://github.com/Igadsme/nestai_cli_project",
      "ai-security-investigator":
        "https://github.com/Igadsme/ai-security-investigator",
      kynovar: "https://github.com/Igadsme/Kynovar",
      hiveu: "https://github.com/Igadsme/HIVEU",
      "ai-recruiter-assistant":
        "https://github.com/Igadsme/ai-recruiter-assistant",
    });
  });

  it("shows the four primary projects in the requested order", () => {
    const primary = getFeaturedProjects();
    expect(primary.map((project) => project.slug)).toEqual([
      "neighborly",
      "devdash",
      "ai-security-investigator",
      "kynovar",
    ]);
    expect(getOrderedProjects().slice(0, 4)).toEqual(primary);
  });

  it("keeps the previous investigator case-study URL resolving to the renamed project", () => {
    expect(getProjectBySlug("ai-security-camera-investigator")?.slug).toBe("ai-security-investigator");
  });

  it("uses verified statuses and exposes a live demo only for the checked deployment", () => {
    const primary = getFeaturedProjects();
    expect(primary.map((project) => project.status)).toEqual([
      "In Development",
      "Live",
      "Prototype",
      "Research",
    ]);
    expect(primary.filter((project) => project.liveUrl).map((project) => project.slug)).toEqual([
      "devdash",
    ]);
  });

  it("provides engineering, stack, and repository-grounded case studies for each primary project", () => {
    for (const project of getFeaturedProjects()) {
      expect(project.engineering).toBeTruthy();
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.caseStudy?.architecture.length).toBeGreaterThan(1);
      expect(project.caseStudy?.whatBuilt?.length).toBeGreaterThan(0);
      expect(project.caseStudy?.testing.length).toBeGreaterThan(0);
    }
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
