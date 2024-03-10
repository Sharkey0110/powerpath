import * as z from "zod";

export const postFormSchema = z.object({
  picture: z.string(),
  text: z.string().min(3, "Caption must be at least 3 characters"),
  tag: z.string(),
});
