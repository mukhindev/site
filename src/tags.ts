import { toSlug } from "./shared/text/toSlug.ts";

export class Tag {
  slug: string;
  names: string[];

  constructor({ slug, names }: { slug: string; names: string[] }) {
    this.slug = slug;
    this.names = names;
  }

  get name() {
    return this.names[0] ?? this.slug;
  }

  hasName(name: string) {
    return this.names
      .map((name) => name.toLowerCase())
      .includes(name.toLowerCase());
  }
}

const tags = [
  new Tag({ slug: "food", names: ["еда", "жрачка", "food"] }),
  new Tag({ slug: "ai", names: ["ai", "искусственный интеллект", "ии"] }),
];

export const findTagByName = (name: string) => {
  return tags.find((tag) => tag.hasName(name));
};

export const findOrCreateTagByName = (name: string) => {
  return findTagByName(name) ?? new Tag({ slug: toSlug(name), names: [name] });
};
