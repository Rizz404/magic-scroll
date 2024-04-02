import { z } from "zod";

export const NoteSchema = z.object({
  studyId: z.string(),
  title: z.string(),
  content: z.string(),
  thumbnailImage: z.instanceof(File),
  attachments: z.array(z.instanceof(File)),
  isPrivate: z.boolean(),
  tags: z.array(z.object({ id: z.string() })).nonempty(),
  notePermission: z.array(z.object({ userId: z.string() })).nonempty(),
});

export type NoteSchema = z.infer<typeof NoteSchema>;
