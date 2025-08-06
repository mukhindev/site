import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { findTagByName } from "./tags.ts";
import { toSlug } from "./shared/text/toSlug.ts";

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "notes" }),
  schema: z.object({
    date: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).transform((tags) => {
      return tags.map((name) => {
        const tag = findTagByName(name);
        return tag ? tag.toJSON() : { slug: toSlug(name), names: [name] };
      });
    }),
  }),
});

export const collections = { notes };
