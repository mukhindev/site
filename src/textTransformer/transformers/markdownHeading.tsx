import { TransformerNode } from "../TransformerNode";
import type { TextTransformer } from "../types";
import type { ReactElement, ReactNode } from "react";

type MarkdownHeadingNodeState = { level: number; content: string };

export class MarkdownHeadingNode extends TransformerNode<MarkdownHeadingNodeState> {
  type = "markdown-heading";

  constructor() {
    super();
  }

  render() {
    const { level, content } = this.state;

    const H = `h${level}` as ReactElement<{
      className: string;
      children: ReactNode;
    }>["type"];

    return <H className={this.className}>{content}</H>;
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
