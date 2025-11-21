import * as z from "zod";

export const SignInSchema = z.object({
  email: z
    .email("Please provide a valid email adress.")
    .min(1, "Email is required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(100, "Password cannot exceed 100 characters."),
});

export const SignUpSchema = z.object({
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

export const AskAQuestionSchema = z.object({
  title: z
    .string()
    .min(5, "Title is required.")
    .max(150, "Title cannot exceed 100 characters."),

  content: z.string().min(1, "Content is required."),
  tags: z
    .array(
      z
        .string()
        .min(1, "Tag is required.")
        .max(30, "Tag cannot exceed 30 characters.")
    )
    .min(1, "At least one tag is required.")
    .max(5, "Cannot have more than 5 tags."),
});

export const UserSchema = z.object({
  name: z.string("Name is required").min(1, { error: "Name is required" }),
  username: z
    .string("UserName is required")
    .min(3, { error: "Username must be at least 3 characters long" }),
  email: z
    .string("Email is required")
    .email({ message: "Please provide a valid email address" }),
  bio: z.string().optional(),
  image: z.string().url({ error: "Please provide a valid URL" }).optional(),
  location: z.string().optional(),
  portfolio: z.string().url({ error: "Please provide a valid URL" }).optional(),
  reputation: z.number().optional(),
});
