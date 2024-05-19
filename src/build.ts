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
  await explore(
    SITE_DIR,
    async ({ sourcePath, targetPath, relativePath, getSource }) => {
      // Регистрируем метаданные из Markdown файлов
      if (sourcePath.endsWith(MD_EXT)) {
        const source = await getSource();
        const { metadata } = extractMetadata(source);
        metadata.link = "/" + relativePath.replace(MD_EXT, HTML_EXT);
        metadata.getSource = getSource;
        metadata.targetPath = targetPath.replace(MD_EXT, HTML_EXT);
        registerPageMetadata(sourcePath, metadata);
      }

      // Копируем CSS
      if (sourcePath.endsWith(CSS_EXT)) {
        const source = await getSource();
        await Bun.write(targetPath, source);
      }
    }
  );

  console.log(metadataStore.pages);

  for await (const [page, metadata] of metadataStore.pages) {
    // Рендер Markdown
    if (page.endsWith(MD_EXT)) {
      const source = await metadata.getSource();
      const { content } = extractMetadata(source);
      const html = renderMarkdown(content);
      await Bun.write(metadata.targetPath, html);
    }
  }

  // Обход для рендера
  await explore(SITE_DIR, async ({ sourcePath, targetPath, getSource }) => {
    // Рендер Markdown
    if (sourcePath.endsWith(MD_EXT)) {
      const source = await getSource();
      const { content } = extractMetadata(source);
      const html = renderMarkdown(content);
      await Bun.write(targetPath.replace(MD_EXT, HTML_EXT), html);
    }
  });
};

await build();
