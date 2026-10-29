import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100),
  email: z.email("Enter a valid email address.").max(254),
  message: z.string().trim().min(1, "Message is required.").max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
