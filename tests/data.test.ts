import { describe, expect, it } from "vitest";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
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

  it("includes the two named résumé projects", () => {
    expect(projects.some((project) => project.title === "DevDash")).toBe(true);
    expect(
      projects.some((project) => project.title === "AI Security Camera Investigator"),
    ).toBe(true);
    expect(projects.every((project) => project.slug !== "nestai")).toBe(true);
  });

  it("lists Python as a language skill", () => {
    expect(skills.some((skill) => skill.name === "Python")).toBe(true);
  });
});
