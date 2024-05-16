import { TransformerNode } from "../TransformerNode";
import type { Transformer } from "../types";

type MarkdownParagraphNodeState = { content: string };

export class MarkdownParagraphNode extends TransformerNode<MarkdownParagraphNodeState> {
  type = "markdown-paragraph";

  constructor() {
    super();
  }

  render() {
    const content = this.state.content.replace(/\s\s\n/g, "<br/>").trim();

    return (
      <div
        className={this.className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
}

export const markdownParagraphTransformer: Transformer<MarkdownParagraphNode> =
  {
    regexp: /[\s\S]+?\n{2,}|[\s\S]+/g,
    node: MarkdownParagraphNode,
    defineState: (match) => {
      return {
        content: match[0],
      };
    },
  };
