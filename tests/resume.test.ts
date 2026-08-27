import { describe, expect, it } from "vitest";
import { getResumeModel } from "@/lib/resume";

describe("getResumeModel", () => {
  it("puts Shaw first for the cybersecurity focus", () => {
    const model = getResumeModel({
      focus: "cyber",
      includeProjectDescriptions: true,
      includeTechnicalSkills: true,
      includeCertifications: false,
      includeAwards: true,
      style: "detailed",
    });
    expect(model.experience[0]?.company).toBe("Shaw Industries");
  });

  it("compacts experience on the one-page style", () => {
    const model = getResumeModel({
      focus: "software",
      includeProjectDescriptions: true,
      includeTechnicalSkills: true,
      includeCertifications: false,
      includeAwards: true,
      style: "compact",
    });
    expect(model.experience.length).toBeLessThanOrEqual(5);
  });
});
