import { TransformerNode } from "../TransformerNode";
import type { TextTransformer } from "../types";

type MarkdownHeadingNodeState = { level: number; content: string };

export class MarkdownHeadingNode extends TransformerNode<MarkdownHeadingNodeState> {
  type = "markdown-heading";

  constructor() {
    super();
  }

  render() {
    const { level, content } = this.state;

    const H = `h${level}`;

    return <h1 className={this.className}>{content}</h1>;
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
