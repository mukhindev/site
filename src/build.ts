import { CSS_EXT, HTML_EXT, MD_EXT, SITE_DIR } from "../config";
import {
  extractPageMetadata,
  metadataStore,
  type SourceMetadata,
} from "./metadata";
import { explore } from "./explorer";
import { renderMarkdown } from "./builder/renderMarkdown";

export const build = async () => {
  metadataStore.resetMetadata();

  // Обход до рендера
  await explore(
    SITE_DIR,
    async ({ sourcePath, targetPath, relativePath, getSource }) => {
      // Регистрируем метаданные из Markdown файлов
      if (sourcePath.endsWith(MD_EXT)) {
        const source = await getSource();
        const { pageMetadata } = extractPageMetadata(source);
        const sourceMetadata: SourceMetadata = {
          link: "/" + relativePath.replace(MD_EXT, HTML_EXT),
          targetPath: targetPath.replace(MD_EXT, HTML_EXT),
          sourcePath,
          getSource,
        };

        metadataStore.registerMetadata(sourcePath, {
          ...pageMetadata,
          ...sourceMetadata,
        });
      }

      // Копируем CSS
      if (sourcePath.endsWith(CSS_EXT)) {
        const source = await getSource();
        await Bun.write(targetPath, source);
      }
    },
  );

  for await (const metadata of metadataStore.pages) {
    // Рендер Markdown
    if (metadata.sourcePath.endsWith(MD_EXT)) {
      const source = await metadata.getSource();
      const { content } = extractPageMetadata(source);
      const html = renderMarkdown(content);
      await Bun.write(metadata.targetPath, html);
    }
  }
};

await build();
