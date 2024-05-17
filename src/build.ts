import { CSS_EXT, HTML_EXT, MD_EXT, SITE_DIR } from "../config";
import {
  extractMetadata,
  metadataStore,
  registerPageMetadata,
} from "./metadata";
import { explore } from "./explorer";
import { renderMarkdown } from "./builder/renderMarkdown.ts";

export const build = async () => {
  // Обход до рендера
  await explore(SITE_DIR, async ({ sourcePath, targetPath, source }) => {
    // Регистрируем метаданные из Markdown файлов
    if (sourcePath.endsWith(MD_EXT)) {
      const { metadata } = extractMetadata(source);
      registerPageMetadata(sourcePath, metadata);
    }

    // Копируем CSS
    if (sourcePath.endsWith(CSS_EXT)) {
      await Bun.write(targetPath, source);
    }
  });

  console.log("Собраны метаданные", metadataStore);

  // Обход для рендера
  await explore(SITE_DIR, async ({ sourcePath, targetPath, source }) => {
    // Рендер Markdown
    if (sourcePath.endsWith(MD_EXT)) {
      const { content } = extractMetadata(source);
      const html = renderMarkdown(content);
      await Bun.write(targetPath.replace(MD_EXT, HTML_EXT), html);
    }
  });
};

await build();
