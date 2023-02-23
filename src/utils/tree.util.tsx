import React, { ReactNode } from "react";
import TreeItem from "@/component/Create/TreeItem";

export const makeStructureTree = (
  list: ReactNode[],
  treeInfo: Tree,
  depth: number
) => {
  if (treeInfo.item.type === "FILE") {
    list.push(
      <TreeItem treeItem={treeInfo.item} key={treeInfo.item.id} depth={depth} />
    );
    return;
  }

  if (treeInfo.item.type === "FOLDER") {
    if (treeInfo.children?.length) {
      list.push(
        <TreeItem
          treeItem={treeInfo.item}
          key={treeInfo.item.id}
          depth={depth}
        />
      );
      treeInfo.children.map((tree) => makeStructureTree(list, tree, depth + 1));
    } else {
      list.push(
        <TreeItem
          treeItem={treeInfo.item}
          key={treeInfo.item.id}
          depth={depth}
        />
      );
    }
  }

  return list;
};
