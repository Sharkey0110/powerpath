import * as z from "zod";

export const postFormSchema = z.object({
  picture: z.string(),
  text: z.string().min(3, "Caption must be at least 3 characters"),
});

export const accountFormSchema = z.object({
  firstName: z.string().max(20, "Too long"),
  lastName: z.string().max(20, "Too long"),
  photo: z.string()
})

export const commentFormSchema = z.object({
  text: z.string().max(64, "comment too long")
})

export const splitFormSchema = z.object({
  title: z.string().max(64, "Too long"),
  days: z.object({
    monday: z.array(
      z.object({
        name: z.string().max(32, "Too long"),
        sets: z.string(),
        reps: z.string(),
      })
    ),
    tuesday: z.array(
      z.object({
        name: z.string().max(32, "Too long"),
        sets: z.string(),
        reps: z.string(),
      })
    ),
    wednesday: z.array(
      z.object({
        name: z.string().max(32, "Too long"),
        sets: z.string(),
        reps: z.string(),
      })
    ),
    thursday: z.array(
      z.object({
        name: z.string().max(32, "Too long"),
        sets: z.string(),
        reps: z.string(),
      })
    ),
    friday: z.array(
      z.object({
        name: z.string().max(32, "Too long"),
        sets: z.string(),
        reps: z.string(),
      })
    ),
    saturday: z.array(
      z.object({
        name: z.string().max(32, "Too long"),
        sets: z.string(),
        reps: z.string(),
      })
    ),
    sunday: z.array(
      z.object({
        name: z.string().max(32, "Too long"),
        sets: z.string(),
        reps: z.string(),
      })
    ),
  }),
});
