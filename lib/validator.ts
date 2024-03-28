import * as z from "zod";

export const postFormSchema = z.object({
  picture: z.string(),
  text: z.string().min(3, "Caption must be at least 3 characters"),
  tag: z.string(),
});

export const accountFormSchema = z.object({
  firstName: z.string().max(20, "Too long"),
  lastName: z.string().max(20, "Too long"),
  photo: z.string()
})

export const commentFormSchema = z.object({
  text: z.string().max(64, "comment too long")
})