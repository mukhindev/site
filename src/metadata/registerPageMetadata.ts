import type { Metadata, MetadataStore } from "./types";

export const metadataStore: MetadataStore = {
  pages: new Map(),
  tagPages: new Map(),
  tagCounters: new Map(),
};

export const registerPageMetadata = (path: string, metadata: Metadata) => {
  metadataStore.pages.set(path, metadata);

  if (metadata.tags) {
    metadata.tags.forEach((tag) => {
      const tagPages = metadataStore.tagPages.get(tag) ?? [];

      if (!tagPages.length) {
        metadataStore.tagPages.set(tag, tagPages);
      }

      tagPages.push(metadata);
    });
  }

  if (metadata.tags) {
    metadata.tags.forEach((tag) => {
      const tagCounter = metadataStore.tagCounters.get(tag) ?? 0;
      metadataStore.tagCounters.set(tag, tagCounter + 1);
    });
  }
};
