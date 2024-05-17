import { TextTransformerNode } from "../TextTransformerNode.ts";
import { type TextTransformer, TextTransformerNodeType } from "../types";

type MarkdownCodeNodeState = { language: string | null; code: string };

export class MarkdownCodeNode extends TextTransformerNode<MarkdownCodeNodeState> {
  type = TextTransformerNodeType.MarkdownCode;

  render() {
    const { language, code } = this.state;

    return (
      <div className={this.className}>
        <pre>
          <code>
            TODO: Format to code [{language}]: {code}
          </code>
        </pre>
      </div>
    );
  }
}

export const markdownCodeTransformer: TextTransformer<MarkdownCodeNode> = {
  regexp: /```\s*(.*)\n([\s\S]+)```\n*/g,
  node: MarkdownCodeNode,
  defineState: (match) => {
    const [, language, code] = match;

    return {
      language,
      code,
    };
  },
};
