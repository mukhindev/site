import { TransformerNode } from "./TransformerNode";
import type { TextTransformer } from "./types";

export function parsePlainTextToNodes<T extends TransformerNode>(
  text: string,
  transformers: TextTransformer<T>[]
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

        parsePlainTextToNode(text.replace(match[0], ""));

        break;
      }
    }
  }

  parsePlainTextToNode(text);

  return nodes;
}

export { TransformerNode };
export type { TextTransformer as Transformer };
export * from "./transformers";
