import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.email("Enter a valid email"),
  company: z.string().trim().max(80).optional().or(z.literal("")),
  subject: z.enum([
    "Software engineering role",
    "AI/ML role",
    "Cybersecurity role",
    "Project collaboration",
    "Something else",
  ]),
  message: z
    .string()
    .trim()
    .min(20, "Message must be at least 20 characters")
    .max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
