import type { CollectionEntry } from "astro:content";
import { findTagBySlug, Tag } from "../../../tags.ts";

/** Сгруппировать статьи по тегам */
export const groupByTagNotes = (notes: CollectionEntry<"notes">[]) => {
  const noteTagMap = new Map<
    string,
    {
      names: string[];
      notes: CollectionEntry<"notes">[];
    }
  >();

  // Раскладываем статьи по именам тегов
  for (const note of notes) {
    for (const { slug, names } of note.data.tags) {
      if (!noteTagMap.has(slug)) {
        noteTagMap.set(slug, { names, notes: [] });
      }

      noteTagMap.get(slug)!.notes.push(note);
    }
  }

  // Создаём объекты тега и сортируем по убыванию упоминания тега
  return Array.from(noteTagMap.entries())
    .map(([slug, { names, notes }]) => ({
      tag: findTagBySlug(slug) ?? new Tag({ slug, names }),
      notes,
    }))
    .sort((a, b) => b.notes.length - a.notes.length);
};
