import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email(),
    name: z
      .string()
      .min(3)
      .max(32)
      .regex(/^[a-zA-Z0-9_.]+$/),
    displayName: z.string().min(1).max(50).nullable(),
    password: z
      .string()
      .min(8)
      .max(64)
      .regex(/^[a-zA-Z0-9!@#$%^&*()\-=_+[\]{}\\|;:'",./<>? ]+$/),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  emailOrUsername: z.string(),
  password: z.string(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
