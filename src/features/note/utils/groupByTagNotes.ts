import type { CollectionEntry } from "astro:content";
import { findOrCreateTagByName, Tag } from "../../../tags.ts";

/** Сгруппировать статьи по тегам */
export const groupByTagNotes = (notes: CollectionEntry<"notes">[]) => {
  const noteTagMap = new Map<
    string,
    {
      tag: Tag;
      notes: CollectionEntry<"notes">[];
    }
  >();

  // Раскладываем статьи по именам тегов
  for (const note of notes) {
    for (const name of note.data.tags) {
      const tag = findOrCreateTagByName(name);

      if (!noteTagMap.has(tag.slug)) {
        noteTagMap.set(tag.slug, { tag, notes: [] });
      }

      noteTagMap.get(tag.slug)!.notes.push(note);
    }
  }

  // Сортируем по убыванию упоминания тега
  return Array.from(noteTagMap.values()).sort(
    (a, b) => b.notes.length - a.notes.length,
  );
};
