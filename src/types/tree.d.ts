export {};

declare global {
  const TreeItemTypeEnum = {
    FILE: "FILE",
    FOLDER: "FOLDER",
  } as const;

  type TreeItemType = typeof TreeItemTypeEnum[keyof typeof TreeItemTypeEnum];

  type TreeItem = {
    id: string;
    type: TreeItemType;
    name: string;
    description?: string;
  };

  type Tree = {
    item: TreeItem;
    children?: TreeList;
  };
  type TreeList = Record<string, Tree>;

  type GithubTreeResponse = {
    tree: {
      path?: string | undefined;
      mode?: string | undefined;
      type?: string | undefined;
      sha?: string | undefined;
      size?: number | undefined;
      url?: string | undefined;
    }[];
  };
}
