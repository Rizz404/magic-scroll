import { z } from "zod";

export const UserSchema = z.object({
  username: z.string().min(5).max(50),
  email: z.string().email(),
});

export type UserSchema = z.infer<typeof UserSchema>;

export const UserProfileSchema = z.object({
  firstName: z.string().min(5).max(50),
  lastName: z.string().min(5).max(50),
  age: z.number().min(1).max(100).positive(),
  phone: z.string(), // ! nanti tambahin regex atau validator
  socialMedias: z.array(z.string()),
});

export type UserProfileSchema = z.infer<typeof UserProfileSchema>;
