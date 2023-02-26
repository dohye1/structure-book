import React, { ReactNode } from "react";
import TreeItem from "@/component/Create/TreeItem";
import { v4 as uuid } from "uuid";
import { Octokit } from "@octokit/rest";

export const onRetrieveGithubTreeInfo = async (args: GithubTreeRequestArgs) => {
  const octokit = new Octokit();

  const requestConfig = {
    owner: args.owner,
    repo: args.repo,
    tree_sha: args.branch.value,
    recursive: "1",
  };

  const treeData = await octokit.rest.git.getTree(requestConfig);
  return treeData.data;
};

export const makeStructureTree = ({
  list,
  treeInfo,
  depth = 0,
  onRemove,
}: {
  list: ReactNode[];
  treeInfo: Tree;
  depth?: number;
  onRemove: (treeItem: TreeItem) => void;
}) => {
  if (treeInfo.item.type === "FILE") {
    list.push(
      <TreeItem
        treeItem={treeInfo.item}
        key={treeInfo.item.id}
        depth={depth}
        onRemove={onRemove}
      />
    );
  }
  if (treeInfo.item.type === "FOLDER") {
    const childrenArr = Object.values(treeInfo.children ?? {});
    if (childrenArr.length) {
      list.push(
        <TreeItem
          treeItem={treeInfo.item}
          key={treeInfo.item.id}
          depth={depth}
          onRemove={onRemove}
        />
      );
      childrenArr.map((tree) =>
        makeStructureTree({ list, treeInfo: tree, depth: depth + 1, onRemove })
      );
    } else {
      list.push(
        <TreeItem
          treeItem={treeInfo.item}
          key={treeInfo.item.id}
          depth={depth}
          onRemove={onRemove}
        />
      );
    }
  }

  return list;
};

export const transformGithubTreeResponse = ({
  tree,
}: GithubTreeResponse): TreeList => {
  return tree.reduce((acc, cur) => {
    if (!cur.path) {
      return acc;
    }
    const structureArr = cur.path.split("/");
    const treeItemType: TreeItemType =
      cur.mode === "040000" ? "FOLDER" : "FILE";
    const curName = structureArr.slice(-1)[0];
    const treeItem: TreeItem = {
      id: uuid(),
      type: treeItemType,
      path: cur.path,
      name: curName,
    };

    let treeRef: TreeList = acc;
    for (let i = 0; i < structureArr.length; i++) {
      if (i === structureArr.length - 1) {
        treeRef[curName] = { item: treeItem };
      } else {
        treeRef[structureArr[i]] = {
          children: {},
          ...treeRef[structureArr[i]],
        };
        treeRef = treeRef[structureArr[i]].children!;
      }
    }
    return acc;
  }, {} as TreeList);
};
