import { Study } from "./Study";
import { Tag } from "./Tag";

export interface Note {
  id: string;
  userId: string;
  studyId: string;
  title: string;
  content: string;
  thumbnailImage: string | null;
  attachments: string[];
  isPrivate: boolean;
  upvotedCount: number;
  createdAt: Date;
  updatedAt: Date;

  study: Study;
  tags: Tag[];
  notePermission?: NotePermission[];
}

export interface NotePermission {
  id: string;
  noteId: string;
  userId: string;
  permission: "READ" | "READ_WRITE";
  createdAt: Date;
  updatedAt: Date;
}
