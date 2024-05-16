import { SITE_DIR } from "../config";
import { processDir } from "./builder/processDir.ts";

export const build = async () => {
  await processDir(SITE_DIR);
};

await build();
