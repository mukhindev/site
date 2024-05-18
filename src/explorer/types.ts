export type ExplorerFile = {
  sourcePath: string;
  targetPath: string;
  relativeDir: string;
  fileName: string;
  getSource: () => Promise<string>;
};
