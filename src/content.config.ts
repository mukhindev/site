import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const notes = defineCollection({
  loader: glob({
    // Заметки должны в папке notes (кроме черновиков, оканчиваются на .draft.md)
    pattern: ["**/notes/**/*.md", "!**/*.draft.md"],
    base: "external",
    generateId: ({ entry, data }) => {
      // Забираем для id страницы название файла
      const match = entry.match(/\/notes\/(.+?)(?:\.[^/.]+)?$/);
      const path = match![1];
      // В path можно передать (через метаданные md файла) стабильный путь независимый от реального положения
      return (data.path as string | undefined) ?? path;
    },
  }),
  schema: z.object({
    date: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    title: z.string(),
    description: z.string().nullable().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = { notes };
