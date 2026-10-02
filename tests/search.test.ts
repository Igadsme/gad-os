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

  it("finds Ask Imani and does not expose the removed Lab section", () => {
    expect(searchSite("Ask Imani").some((item) => item.href === "/assistant")).toBe(true);
    expect(searchSite("lab").some((item) => item.href === "/lab")).toBe(false);
  });
});
