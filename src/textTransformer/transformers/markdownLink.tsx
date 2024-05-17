import { TransformerNode } from "../TransformerNode";
import type { TextTransformer } from "../types";

type MarkdownLinkNodeState = { content: string; href: string };

export class MarkdownLinkNode extends TransformerNode<MarkdownLinkNodeState> {
  type = "markdown-link";

  constructor() {
    super();
  }

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
  regexp: /\[(.+)]\((.+)\)/g,
  node: MarkdownLinkNode,
  defineState: (match) => {
    const [, content, href] = match;

    return {
      content,
      href: href.trim(),
    };
  },
};
