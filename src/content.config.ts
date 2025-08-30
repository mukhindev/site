import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "notes" }),
  schema: z.object({
    date: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    title: z.string(),
    description: z.string().nullable().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = { notes };
