import { CONTENT_DIR, PUBLIC_DIR } from "../config";
import { renderContent } from "./contentRender";

export function build() {
  renderContent({ rootDir: CONTENT_DIR, outDir: PUBLIC_DIR });
}
