import { CSS_EXT, HTML_EXT, MD_EXT, PUBLIC_DIR, SITE_DIR } from "../../config";
import { basename, join, relative } from "node:path";
import { renderMarkdown } from "./renderMarkdown";

export const processFile = async (path: string) => {
  const file = Bun.file(path);
  const text = await file.text();
  const fileName = basename(path);
  const relativePath = relative(SITE_DIR, path);
  const targetPath = join(PUBLIC_DIR, relativePath);

  /** Markdown */
  if (fileName.endsWith(MD_EXT)) {
    const html = renderMarkdown(text);
    await Bun.write(targetPath.replace(MD_EXT, HTML_EXT), html);
  }

  /** CSS */
  if (fileName.endsWith(CSS_EXT)) {
    await Bun.write(targetPath, text);
  }
};
