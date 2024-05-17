import { TextTransformerNode } from "./TextTransformerNode.ts";

export const enum TextTransformerNodeType {
  MarkdownCode = "markdown-code",
  MarkdownHeading = "markdown-heading",
  MarkdownLink = "markdown-link",
  MarkdownParagraph = "markdown-paragraph",
  MarkdownTable = "markdown-table",
}

export type TextTransformer<T extends TextTransformerNode<unknown>> = {
  regexp: RegExp;
  node: {
    new (
      ...args: ConstructorParameters<typeof TextTransformerNode<unknown>>
    ): T;
  };
  defineState: (match: RegExpMatchArray) => T["state"];
};

export type TextTransformerNodeTheme = Partial<
  Record<TextTransformerNodeType, string>
>;
