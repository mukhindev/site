import { getCollection } from "astro:content";
import { POSTS_BASE_PATH } from "../app.config.ts";

export const prerender = true;

export async function GET() {
  const posts = await getCollection("posts");

  const data = posts.map(({ data, id }) => ({
    title: data.title,
    path: `/${POSTS_BASE_PATH}/${id}`,
  }));

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
