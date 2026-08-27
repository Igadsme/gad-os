import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/validations/contact";

describe("contactSchema", () => {
  it("accepts a complete message", () => {
    const parsed = contactSchema.safeParse({
      name: "Alex Recruiter",
      email: "alex@example.com",
      company: "Example",
      subject: "Software engineering role",
      message: "We would like to talk about a software engineering internship.",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects a short message", () => {
    const parsed = contactSchema.safeParse({
      name: "Al",
      email: "not-an-email",
      subject: "Software engineering role",
      message: "Hi",
    });
    expect(parsed.success).toBe(false);
  });
});
