import { TextTransformerNode } from "../TextTransformerNode.ts";
import { type TextTransformer, TextTransformerNodeType } from "../types";

type MarkdownParagraphNodeState = { content: string };

export class MarkdownParagraphNode extends TextTransformerNode<MarkdownParagraphNodeState> {
  type = TextTransformerNodeType.MarkdownParagraph;

  render() {
    // В Markdown 2+ пробела в конце это перенос на следующую строку
    const content = this.state.content.replace(/\s\s\n/g, "<br/>");

    return (
      <div
        className={this.className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
}

export const markdownParagraphTransformer: TextTransformer<MarkdownParagraphNode> =
  {
    regexp: /[\s\S]+?\n{2,}|[\s\S]+/g,
    node: MarkdownParagraphNode,
    defineState: (match) => {
      const [content] = match;

      return {
        content: content.trim(),
      };
    },
  };
