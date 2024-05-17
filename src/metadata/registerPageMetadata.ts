import type { Metadata } from "./types";

const pagesMetadata = new Map<string, Metadata>();

export const metadataStore = {
  pages: pagesMetadata,
};

export const registerPageMetadata = (path: string, metadata: Metadata) => {
  pagesMetadata.set(path, metadata);
};
