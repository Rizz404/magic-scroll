import { Study } from "./Study";
import { Tag } from "./Tag";
import { Profile, User } from "./User";

export interface Note {
  id: string;
  userId: string;
  studyId: string;
  title: string;
  content: string;
  thumbnailImage?: File | string;
  attachments?: File[] | string[];
  isPrivate: boolean;
  upvotedCount: number;
  downvotedCount: number;
  favoritedCount: number;
  savedCount: number;
  createdAt: Date;
  updatedAt: Date;

  user: UserWithImageFromProfile;
  study: Pick<Study, "id" | "name" | "image">;
  tags: Pick<Tag, "id" | "name">[];
  notePermission?: NotePermission[];
  noteInteraction: NoteInteraction[];
}

export interface NotePermission {
  id: string;
  noteId: string;
  userId: string;
  permission: "READ" | "READ_WRITE";
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteInteraction {
  userId: string;
  noteId: string;
  isUpvoted: boolean;
  isDownvoted: boolean;
  isFavorited: boolean;
  isSaved: boolean;
}

export type UserWithImageFromProfile = Pick<User, "username" | "email" | "isVerified"> & {
  profile: Pick<Profile, "profileImage">;
};

export type NoteInput = Omit<
  Note,
  "id" | "userId" | "upvotedCount" | "createdAt" | "updatedAt" | "study"
> & {
  tags: Pick<Tag, "id">[];
  notePermission: Pick<NotePermission, "userId">[];
};

export type categories = "home" | "shared" | "private" | "favorited" | "saved" | "self";
export type orders = "best" | "worst" | "new" | "old";

export interface NoteListsProps {
  page: number;
  limit: number;
  category?: categories;
  order?: orders;
}
