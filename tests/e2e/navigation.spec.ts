import { expect, test } from "@playwright/test";

test("home renders Imani Gad and primary nav", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Imani Gad" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Projects" }).first()).toBeVisible();
});

test("projects page lists DevDash", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "DevDash" })).toBeVisible();
});

test("command palette navigates to experience", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Meta+k");
  const search = page.getByPlaceholder("Search projects, skills, or experience...");
  await search.waitFor({ state: "visible" });
  await search.fill("wellstar");
  await page.getByText("Wellstar Health System").first().click();
  await expect(page).toHaveURL(/experience/);
});

test("removed Assistant and Lab sections are not public destinations", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "AI Assistant" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Lab" })).toHaveCount(0);

  await page.goto("/assistant");
  await expect(page).toHaveURL(/\/$/);

  await page.goto("/lab");
  await expect(page).toHaveURL(/\/projects$/);
});
