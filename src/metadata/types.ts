export type SourceMetadata = {
  link: string;
  sourcePath: string;
  targetPath: string;
  getSource: () => Promise<string>;
};

export type PageMetadata = {
  title?: string;
  tags?: string[];
};

export type Metadata = SourceMetadata & PageMetadata;

export type Tag = {
  name: string;
  page: Metadata;
};
