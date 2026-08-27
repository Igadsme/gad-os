import { describe, expect, it } from "vitest";
import { searchPortfolio } from "@/lib/search";

describe("searchPortfolio", () => {
  it("finds DevDash by name", () => {
    const results = searchPortfolio("devdash");
    expect(results.some((item) => item.title === "DevDash")).toBe(true);
  });

  it("finds Wellstar as an employer", () => {
    const results = searchPortfolio("wellstar");
    expect(results.some((item) => item.type === "Employer")).toBe(true);
  });

  it("finds Python as a skill", () => {
    const results = searchPortfolio("python");
    expect(results.some((item) => item.title === "Python")).toBe(true);
  });

  it("finds pages", () => {
    const results = searchPortfolio("assistant");
    expect(results.some((item) => item.href === "/assistant")).toBe(true);
  });
});
