import type { CollectionEntry } from "astro:content";
import { findOrCreateTagByName, Tag } from "../../../tags.ts";

/** Сгруппировать статьи по тегам */
export const groupByTagPosts = (posts: CollectionEntry<"posts">[]) => {
  const postTagMap = new Map<
    string,
    {
      tag: Tag;
      posts: CollectionEntry<"posts">[];
    }
  >();

  // Раскладываем статьи по именам тегов
  for (const post of posts) {
    for (const name of post.data.tags) {
      const tag = findOrCreateTagByName(name);

      if (!postTagMap.has(tag.slug)) {
        postTagMap.set(tag.slug, { tag, posts: [] });
      }

      postTagMap.get(tag.slug)!.posts.push(post);
    }
  }

  // Сортируем по убыванию упоминания тега
  return Array.from(postTagMap.values()).sort(
    (a, b) => b.posts.length - a.posts.length,
  );
};
