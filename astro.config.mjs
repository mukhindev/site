// @ts-check
import { defineConfig } from "astro/config";
import rehypeMermaid from "rehype-mermaid";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://mukhin.dev",
  output: "static",
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      // Игнорировать кодовый блок mermaid при подсветке синтаксиса
      excludeLangs: ["mermaid"],
    },
    shikiConfig: {
      // Тема подставляет ссылки на кастомные свойства, которые определяем самостоятельно
      theme: "css-variables",
    },
    // Отрисовка диаграмм кодовым блоком mermaid
    rehypePlugins: [rehypeMermaid],
  },
  integrations: [
    sitemap({
      filter: (page) => page !== "/search.json",
    }),
  ],
});
