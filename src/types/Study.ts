export interface Study {
  id: string;
  name: string;
  description: string;
  image?: string | null | File;
  createdAt: Date;
  updatedAt: Date;
}
