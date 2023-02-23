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
    children?: Tree[];
  };

  type TreeList = Tree[];
}
