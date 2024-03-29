import { z } from "zod";

export const StudySchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
});

export type StudySchema = z.infer<typeof StudySchema>;
