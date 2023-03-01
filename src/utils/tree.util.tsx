import React, { ReactNode } from "react";
import TreeItem from "@/component/Create/TreeItem";
import { v4 as uuid } from "uuid";
import { Octokit } from "@octokit/rest";
import { cloneDeep } from "lodash";

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
      parentList: [],
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

// github에서 받아온 데이터를 depth가 있는 객체로 관리하고있는데,
// key가 폴더/파일의 이름이기때문에, 폴더/파일의 이름을 수정하게되면 key를 변경해야한다.
// 그래서 key를 id로 변경하는 util을 만들어줌

export const replaceNameKeyToIdKey = (
  treeList: TreeList,
  mappedTree: TreeList,
  parentList: string[]
): TreeList => {
  const currentItems = Object.values(treeList);
  const copiedItems = cloneDeep(currentItems);

  copiedItems.forEach(({ item, children = {} }) => {
    mappedTree[item.id] = {
      item: { ...item, parentList },
      children: {},
    };

    replaceNameKeyToIdKey(children, mappedTree[item.id].children!, [
      ...parentList,
      item.id,
    ]);
  });

  return mappedTree;
};
