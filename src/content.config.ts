import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({
    // Заметки должны быть в папке posts (кроме черновиков, оканчиваются на .draft.md)
    pattern: ["**/posts/**/*.md", "!**/*.draft.md"],
    base: "content",
    generateId: ({ entry, data }) => {
      // Забираем для пути страницы часть начинающеюся относительно папки posts/
      const match = entry.match(/\/posts\/(.+?)(?:\.[^/.]+)?$/);
      const path = match ? match[1] : null;
      // В path можно передать (через метаданные md файла) стабильный путь независимый от реального положения
      return (data.path as string | undefined) ?? path ?? entry;
    },
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().nullable().optional(),
    pinned: z.boolean().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = { posts };
