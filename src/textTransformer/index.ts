import { TransformerNode } from "./TransformerNode";
import type { Transformer } from "./types";
import {
  markdownParagraphTransformer,
  markdownTableTransformer,
  markdownCodeTransformer,
} from "./transformers";

function parsePlainTextToNodes<T extends TransformerNode>(
  text: string,
  transformers: Transformer<T>[]
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

export {
  parsePlainTextToNodes,
  TransformerNode,
  markdownParagraphTransformer,
  markdownCodeTransformer,
  markdownTableTransformer,
};

export type { Transformer };
