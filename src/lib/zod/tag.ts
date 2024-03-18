import { z } from "zod";

export const TagSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10).optional(),
});

export type TagSchema = z.infer<typeof TagSchema>;
