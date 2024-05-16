import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { processFile } from "./processFile.ts";

/** Рекурсивный обход директорий с обработкой файлов */
export const processDir = async (path: string): Promise<void> => {
  const fileNames = await readdir(path);

  for await (const fileName of fileNames) {
    const filePath = join(path, fileName);
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      await processDir(filePath);

      return;
    }

    await processFile(join(path, fileName));
  }
};
