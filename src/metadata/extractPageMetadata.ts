import { parse } from "yaml";
import type { PageMetadata } from "./types";

export const extractPageMetadata = (
  text: string,
): { pageMetadata: PageMetadata; content: string } => {
  const pageMetadata: PageMetadata = {};

  const [, , metadataRaw, content] =
    text.match(/^(---\n([\s\S]*)---\n{2,})?([\s\S]*)/) ?? [];

  if (metadataRaw) {
    Object.assign(pageMetadata, parse(metadataRaw));
  }

  return {
    pageMetadata,
    content,
  };
};
