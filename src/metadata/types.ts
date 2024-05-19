export type Metadata = {
  title?: string;
  link: string;
  tags?: string[];
  targetPath: string;
  getSource: () => Promise<string>;
};

export type MetadataStore = {
  pages: Map<string, Metadata>;
  tagCounters: Map<string, number>;
  tagPages: Map<string, Metadata[]>;
};
