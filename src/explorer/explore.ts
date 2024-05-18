import { readdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { PUBLIC_DIR, SITE_DIR } from "../../config.ts";
import type { ExplorerFile } from "./types.ts";

const getSource = async (path: string) => {
  const file = Bun.file(path);
  return await file.text();
};

/** Рекурсивный обход директорий с запуском обработчика */
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

    await handle({
      sourcePath: filePath,
      fileName,
      relativeDir,
      targetPath,
      getSource: () => getSource(filePath),
    });
  }
};
