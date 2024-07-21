import type { Metadata } from "./types";

class MetadataStore {
  private _pageMap: Record<string, Metadata> = {};
  private _tagMap: Record<string, Metadata[]> = {};

  public get pages(): Metadata[] {
    return Object.values(this._pageMap);
  }

  public get tags(): { name: string; pages: Metadata[] }[] {
    return Object.entries(this._tagMap).map(([name, pages]) => {
      return { name, pages };
    });
  }

  public getPage(path: string): Metadata {
    if (!this._pageMap[path]) {
      throw Error(`Ошибка получения метаданных страницы по path: ${path}`);
    }

    return this._pageMap[path];
  }

  public getTagPages(name: string): Metadata[] {
    if (!this._tagMap[name]) {
      throw Error(
        `Ошибка получения метаданных страниц связанных с тегом: ${name}`,
      );
    }

    return this._tagMap[name];
  }

  public registerMetadata(path: string, metadata: Metadata) {
    this._pageMap[path] = metadata;

    if (metadata.tags) {
      metadata.tags.forEach((tag) => {
        const tagPages = this._tagMap[tag] ?? [];

        if (!tagPages.length) {
          this._tagMap[tag] = tagPages;
        }

        tagPages.push(metadata);
      });
    }
  }

  public resetMetadata() {
    this._pageMap = {};
    this._tagMap = {};
  }
}

export const metadataStore = new MetadataStore();
