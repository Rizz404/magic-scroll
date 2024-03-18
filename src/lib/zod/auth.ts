import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(3),
  email: z.string().email().min(3),
  password: z.string().min(3),
  confirmPassword: z
    .string()
    .min(3)
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
});

export type RegisterSchema = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(3, "Passord is required"),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
