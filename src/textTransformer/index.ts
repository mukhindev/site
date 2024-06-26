import { TextTransformerNode } from "./TextTransformerNode.ts";
import type { TextTransformer, TextTransformerNodeTheme } from "./types";

export function parsePlainTextToNodes<T extends TextTransformerNode>(
  text: string,
  transformers: TextTransformer<T>[],
  theme?: TextTransformerNodeTheme
) {
  const nodes: T[] = [];

  function parsePlainTextToNode(text: string) {
    if (!text) {
      return;
    }

    for (const options of transformers ?? []) {
      const matches = text.matchAll(options.regexp);
      const [match] = matches;

      if (match && match?.index === 0) {
        const Node = options.node;
        const node = new Node();
        const state = options.defineState(match);

        node.setState(state);
        nodes.push(node);

        if (theme) {
          node.setTheme(theme);
        }

        parsePlainTextToNode(text.replace(match[0], ""));

        break;
      }
    }
  }

  parsePlainTextToNode(text);

  return nodes;
}

export { TextTransformerNode };
export * from "./transformers";
export * from "./types";
