import { readdir } from "node:fs/promises";
import { join } from "node:path";
import {
  markdownTableTransformer,
  markdownCodeTransformer,
  markdownParagraphTransformer,
  parsePlainTextToNodes,
  TransformerNode,
  type Transformer,
} from "../textTransformer";
import { createHTML } from "./createHTML";
import PageLayout from "../templates/PageLayout";

const MARKDOWN_EXT = "md";
const HTML_EXT = "html";

const transformers: Transformer<TransformerNode>[] = [
  markdownTableTransformer,
  markdownCodeTransformer,
  markdownParagraphTransformer,
];

type ContentRenderOptions = {
  rootDir: string;
  outDir: string;
};

export async function renderContent(
  options: ContentRenderOptions
): Promise<void> {
  const { rootDir, outDir } = options;
  const fileNames = await readdir(rootDir);

  const markdownFileNames = fileNames.filter((el) => {
    return el.endsWith(`.${MARKDOWN_EXT}`);
  });

  for await (const markdownFileName of markdownFileNames) {
    const file = Bun.file(join(rootDir, markdownFileName));
    const markdown = await file.text();
    const nodes = parsePlainTextToNodes(markdown, transformers);
    const elements = nodes.map((node) => node.render());
    const html = createHTML(PageLayout, elements);
    const filename = markdownFileName.replace(`.${MARKDOWN_EXT}`, "");

    Bun.write(join(outDir, `${filename}.${HTML_EXT}`), html);
  }
}
