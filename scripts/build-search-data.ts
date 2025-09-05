import { getCollection } from "astro:content";
import fs from "fs";

const posts = await getCollection("posts");

const data = posts.map((post) => ({
  title: post.data.title,
  description: post.data.description,
  tags: post.data.tags,
  slug: `/posts/${post.id}/`,
}));

fs.writeFileSync("public/search-data.json", JSON.stringify(data));
