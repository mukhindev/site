import PageLayout from "../templates/PageLayout";
import {
  TransformerNode,
  markdownCodeTransformer,
  markdownParagraphTransformer,
  markdownTableTransformer,
  parsePlainTextToNodes,
  type Transformer,
} from "../textTransformer";
import { createPage } from "./createPage.tsx";

const transformers: Transformer<TransformerNode>[] = [
  markdownTableTransformer,
  markdownCodeTransformer,
  markdownParagraphTransformer,
];

export const renderMarkdown = (markdown: string): string => {
  const nodes = parsePlainTextToNodes(markdown, transformers);
  const elements = nodes.map((node) => node.render());

  return createPage(PageLayout, elements);
};
