import { TransformerNode } from "./TransformerNode";

export type Transformer<T extends TransformerNode<unknown>> = {
  regexp: RegExp;
  node: {
    new (...args: ConstructorParameters<typeof TransformerNode<unknown>>): T;
  };
  defineState: (match: RegExpMatchArray) => T["state"];
};
