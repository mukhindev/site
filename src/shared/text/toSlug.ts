import slugify from "slugify";

/** Привести строку к slug */
export const toSlug = (str: string) => {
  return slugify(str, {
    lower: true,
    strict: true,
    locale: "ru",
  });
};
