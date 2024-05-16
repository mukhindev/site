import { EXT_HTML, EXT_MD, PUBLIC_DIR, SITE_DIR } from "../../config";
import { basename, join, relative } from "node:path";
import { renderMarkdown } from "./renderMarkdown";

export const processFile = async (path: string) => {
  console.log("path", path);

  const file = Bun.file(path);
  const text = await file.text();
  const fileName = basename(path);

  /** Markdown */
  if (fileName.endsWith(EXT_MD)) {
    const relativePath = relative(SITE_DIR, path);
    const targetPath = join(PUBLIC_DIR, relativePath).replace(EXT_MD, EXT_HTML);
    const html = renderMarkdown(text);

    console.log(relativePath);
    console.log(targetPath);

    await Bun.write(targetPath, html);
  }
};
