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
  await page.getByPlaceholder("Search projects, skills, or experience...").nth(1).fill("wellstar");
  await page.getByText("Wellstar Health System").first().click();
  await expect(page).toHaveURL(/experience/);
});
