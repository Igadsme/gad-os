import { describe, expect, it } from "vitest";
import { searchSite } from "@/lib/search";

describe("searchSite", () => {
  it("finds DevDash by name", () => {
    const results = searchSite("devdash");
    expect(results.some((item) => item.title === "DevDash")).toBe(true);
  });

  it("finds Wellstar as an employer", () => {
    const results = searchSite("wellstar");
    expect(results.some((item) => item.type === "Employer")).toBe(true);
  });

  it("finds Python as a skill", () => {
    const results = searchSite("python");
    expect(results.some((item) => item.title === "Python")).toBe(true);
  });

  it("does not expose removed sections", () => {
    expect(searchSite("assistant")).toEqual([]);
    expect(searchSite("lab")).toEqual([]);
  });
});
