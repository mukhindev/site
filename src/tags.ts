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

  toJSON() {
    return {
      slug: this.slug,
      names: this.names,
    };
  }
}

const tags = [
  new Tag({ slug: "food", names: ["еда", "жрачка"] }),
  new Tag({ slug: "ai", names: ["ai", "искусственный интеллект", "ии"] }),
];

export const findTagByName = (name: string) => {
  return tags.find((tag) => tag.hasName(name));
};

export const findTagBySlug = (slug: string) => {
  return tags.find((tag) => tag.slug === slug);
};

console.log(findTagByName("ии"));
