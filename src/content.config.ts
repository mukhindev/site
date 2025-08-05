import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "notes" }),
  schema: z.object({
    // date: z
    //   .string()
    //   .refine((value) => !isNaN(Date.parse(value)), {
    //     message: `Неверный формат даты. Использовать 2000-01-01 18:00`,
    //   })
    //   .transform((value) => new Date(value)),
    date: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { notes };
