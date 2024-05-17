import { readdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { PUBLIC_DIR, SITE_DIR } from "../../config.ts";
import type { ExplorerFile } from "./types.ts";

/** Рекурсивный обход директорий и запуск обработчика файлов */
export const explore = async (
  path: string,
  handle: (file: ExplorerFile) => Promise<void>
): Promise<void> => {
  const fileNames = await readdir(path);

  for await (const fileName of fileNames) {
    const filePath = join(path, fileName);
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      await explore(filePath, handle);
      continue;
    }

    const relativeDir = relative(SITE_DIR, path);
    const targetPath = join(PUBLIC_DIR, relativeDir, fileName);

    const file = Bun.file(filePath);
    const text = await file.text();

    await handle({
      sourcePath: filePath,
      fileName,
      relativeDir,
      targetPath,
      source: text,
    });
  }
};
