import PageLayout from "../templates/PageLayout";
import {
  TextTransformerNode,
  markdownCodeTransformer,
  markdownParagraphTransformer,
  markdownTableTransformer,
  markdownLinkTransformer,
  markdownHeadingTransformer,
  parsePlainTextToNodes,
  TextTransformerNodeType,
  type TextTransformer,
  type TextTransformerNodeTheme,
} from "../textTransformer";
import { createPage } from "./createPage";

const transformers: TextTransformer<TextTransformerNode>[] = [
  markdownTableTransformer,
  markdownCodeTransformer,
  markdownLinkTransformer,
  markdownHeadingTransformer,
  markdownParagraphTransformer,
];

const theme: TextTransformerNodeTheme = {
  [TextTransformerNodeType.MarkdownHeading]: "heading",
};

export const renderMarkdown = (markdown: string): string => {
  const nodes = parsePlainTextToNodes(markdown, transformers, theme);
  const elements = nodes.map((node) => node.render());

  return createPage(PageLayout, elements);
};
