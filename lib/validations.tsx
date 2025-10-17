import * as z from "zod";

export const signInSchema = z.object({
  email: z
    .email("Please provide a valid email adress.")
    .min(1, "Email is required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(100, "Password cannot exceed 100 characters."),
});

export const signUpSchema = z.object({
  email: z
    .email("Please provide a valid email address.")
    .min(1, "Email is required"),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(30, "Username cannot exceed 30 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores."
    ),

  name: z
    .string()
    .min(1, "Name is required.")
    .max(50, "Name cannot exceed 50 characters.")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, apostrophes, and hyphens."
    ),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(100, "Password cannot exceed 100 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character."
    ),
});
