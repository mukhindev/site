import { TextTransformerNode } from "../TextTransformerNode.ts";
import { type TextTransformer, TextTransformerNodeType } from "../types";
import type { ReactElement, ReactNode } from "react";

type MarkdownHeadingNodeState = { level: number; content: string };

export class MarkdownHeadingNode extends TextTransformerNode<MarkdownHeadingNodeState> {
  type = TextTransformerNodeType.MarkdownHeading;

  render() {
    const { level, content } = this.state;

    const H = `h${level}` as ReactElement<{
      className: string;
      children: ReactNode;
    }>["type"];

    return (
      <H className={`${this.className} ${this.className}_level_${level}`}>
        {content}
      </H>
    );
  }
}

export const markdownHeadingTransformer: TextTransformer<MarkdownHeadingNode> =
  {
    regexp: /(#+)\s([\w\W]+?)\n{2,}/g,
    node: MarkdownHeadingNode,
    defineState: (match) => {
      const [, hash, content] = match;

      const level = hash.length > 6 ? 6 : hash.length;

      return {
        level,
        content,
      };
    },
  };
