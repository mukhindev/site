import type { Plugin } from "unified";
import type { Root, Element } from "hast";

export const rehypeRemoveH1: Plugin<[], Root> = () => {
  return (tree: Root) => {
    const h1 = tree.children.find(
      (node): node is Element =>
        node.type === "element" && node.tagName === "h1",
    );

    if (h1) {
      const firstChild = h1.children[0];

      if (firstChild?.type === "text") {
        tree.children = tree.children.filter((node) => node !== h1);
      }
    }
  };
};
