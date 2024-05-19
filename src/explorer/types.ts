export type ExplorerFile = {
  sourcePath: string;
  targetPath: string;
  relativePath: string;
  relativeDir: string;
  fileName: string;
  getSource: () => Promise<string>;
};
