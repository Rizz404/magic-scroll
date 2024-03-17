import { MutationResponse } from "./Response";

// * Main
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: Roles;
  isOauth: boolean;
  lastLogin: Date;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;

  profile: Profile;
}

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  age: number | null;
  phone: string;
  socialMedias: string[];
  createdAt: Date;
  updatedAt: Date;
}

// * Detailed
export type Roles = "USER" | "ADMIN";

export type AuthResponse = MutationResponse<Omit<User, "password">>;

export type RegisterInput = Pick<User, "username" | "email" | "password">;
export type LoginInput = Pick<User, "username" | "password">;
