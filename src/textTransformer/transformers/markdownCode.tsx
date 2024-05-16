import { TransformerNode } from "../TransformerNode";
import type { Transformer } from "../types";

type MarkdownCodeNodeState = { language: string | null; code: string };

export class MarkdownCodeNode extends TransformerNode<MarkdownCodeNodeState> {
  type = "markdown-code";

  constructor() {
    super();
  }

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

export const markdownCodeTransformer: Transformer<MarkdownCodeNode> = {
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
