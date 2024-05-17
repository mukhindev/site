import { parse } from "yaml";
import type { Metadata } from "./types.ts";

export const extractMetadata = (
  text: string
): { metadata: Metadata; content: string } => {
  const metadata: Metadata = {};

  const [, , metadataRaw, content] =
    text.match(/^(---\n([\s\S]*)---\n{2,})?([\s\S]*)/) ?? [];

  if (metadataRaw) {
    Object.assign(metadata, parse(metadataRaw));
  }

  return {
    metadata,
    content,
  };
};
