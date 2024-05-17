import { TextTransformerNode } from "../TextTransformerNode.ts";
import { type TextTransformer, TextTransformerNodeType } from "../types";

type MarkdownLinkNodeState = { content: string; href: string };

export class MarkdownLinkNode extends TextTransformerNode<MarkdownLinkNodeState> {
  type = TextTransformerNodeType.MarkdownLink;

  render() {
    const { content, href } = this.state;

    return (
      <a href={href} className={this.className}>
        {content}
      </a>
    );
  }
}

export const markdownLinkTransformer: TextTransformer<MarkdownLinkNode> = {
  regexp: /\[(.+)]\((.+)\)(\n{2,})?/g,
  node: MarkdownLinkNode,
  defineState: (match) => {
    const [, content, href] = match;

    return {
      content,
      href: href.trim(),
    };
  },
};
