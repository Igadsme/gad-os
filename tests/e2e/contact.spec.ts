import { expect, test } from "@playwright/test";

test("contact form validates short messages", async ({ page }) => {
  await page.goto("/contact");
  await page.getByPlaceholder("Your full name").fill("A");
  await page.getByPlaceholder("your.email@example.com").fill("not-email");
  await page.getByPlaceholder("What would you like to build?").fill("Hi");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByText("Name must be at least 2 characters")).toBeVisible();
  await expect(page.getByText("Enter a valid email")).toBeVisible();
  await expect(page.getByText("Message must be at least 20 characters")).toBeVisible();
});
