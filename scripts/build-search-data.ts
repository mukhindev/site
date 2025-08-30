import { getCollection } from "astro:content";
import fs from "fs";

const notes = await getCollection("notes");

const data = notes.map((note) => ({
  title: note.data.title,
  description: note.data.description,
  tags: note.data.tags,
  slug: `/notes/${note.id}/`,
}));

fs.writeFileSync("public/search-data.json", JSON.stringify(data));
