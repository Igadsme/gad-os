import { expect, test } from "@playwright/test";

test("home renders Imani Gad and primary nav", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("building systems that ship.");
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Work" }),
  ).toBeVisible();
});

test("projects page lists DevDash", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "DevDash" })).toBeVisible();
});

test("home page presents the primary projects in order", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".editorial-project__body h2")).toHaveText([
    "Neighborly",
    "DevDash",
    "AI Security Investigator",
    "Kynovar",
  ]);
  await expect(page.locator(".editorial-project--security .project-architecture-preview")).toBeVisible();
});

test("projects page shows the four primary projects in order", async ({ page }) => {
  await page.goto("/projects");
  const primary = page.getByRole("region", { name: "Primary Projects" });
  await expect(primary.locator("h3")).toHaveText([
    "Neighborly",
    "DevDash",
    "AI Security Investigator",
    "Kynovar",
  ]);
  await expect(primary.locator(".project-card--security .project-architecture-preview")).toBeVisible();
});

test("primary case studies share the requested structure and only verified demos", async ({ page }) => {
  const projects = [
    { slug: "neighborly", title: "Neighborly", live: false },
    { slug: "devdash", title: "DevDash", live: true },
    { slug: "ai-security-investigator", title: "AI Security Investigator", live: false },
    { slug: "kynovar", title: "Kynovar", live: false },
  ];
  const sections = [
    "Overview",
    "Problem",
    "Architecture",
    "What I Built",
    "Technical Challenges",
    "Stack",
    "Validation / Testing",
    "Current Status",
    "GitHub / Demo",
  ];

  for (const project of projects) {
    await page.goto(`/projects/${project.slug}`);
    await expect(page.getByRole("heading", { name: project.title, exact: true })).toBeVisible();
    for (const section of sections) {
      await expect(page.getByRole("heading", { name: section, exact: true })).toBeVisible();
    }
    await expect(page.getByRole("link", { name: "GitHub", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Live Demo", exact: true })).toHaveCount(project.live ? 1 : 0);
  }
});

test("primary navigation opens experience", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Experience" }).click();
  await expect(page).toHaveURL(/\/experience$/);
});

test("Ask Imani is public and the research lab remains reachable", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Ask Imani" }).click();
  await expect(page).toHaveURL(/\/assistant$/);
  await expect(page.getByRole("heading", { name: "Ask Imani", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: /Tell me about Imani Gad/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Lab" })).toHaveCount(0);

  await page.goto("/lab");
  await expect(page.getByRole("heading", { name: "Engineering lab" })).toBeVisible();
});

test("assistant is usable on mobile and reports an unavailable backend", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/assistant");
  await expect(page.getByRole("heading", { name: "Ask Imani", exact: true })).toBeVisible();
  await expect.poll(() =>
    page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);

  const input = page.getByRole("textbox", { name: "Ask about Imani Gad" });
  await input.fill("Tell me about Imani's backend experience");
  await input.press("Enter");
  await expect(page.getByText(/assistant is temporarily unavailable/i)).toBeVisible();
});
