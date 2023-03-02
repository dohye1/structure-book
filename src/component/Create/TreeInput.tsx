import { normalizeTreeData } from "@/utils/tree.util";
import { css } from "@emotion/react";
import { cloneDeep } from "lodash";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import React, {
  ReactNode,
  useState,
  useEffect,
  useMemo,
  Fragment,
} from "react";
import Button from "../Button";
import ControlButton from "../ControlButton";
import GithubModal from "@/component/Create/GithubModal";
import SVG from "../SVG";
import {
  onRetrieveGithubTreeInfo,
  replaceNameKeyToIdKey,
  transformGithubTreeResponse,
} from "@/utils/tree.util";
import TreeItem from "./TreeItem";
import TreeTempItem from "./TreeTempItem";

type Props = {
  onChangeGithubURL: (githubURL: string) => void;
};

export default function TreeInput({ onChangeGithubURL }: Props) {
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TreeItem>();
  const [isLoadingGithubTree, setIsLoadingGithubTree] = useState(false);
  const [treeList, setTreeList] = useState<TreeList>(() => {
    const id = uuid();
    return {
      [id]: {
        item: {
          id,
          type: "FILE",
          name: "index.html",
          path: "index.html",
          parentList: [],
        },
      },
    };
  });

  const [tempItem, setTempItem] = useState<SimpleTreeItem>();

  const onRemove = (treeItem: TreeItem) => {
    let originalTreeList = cloneDeep(treeList);
    let treeRef = originalTreeList;

    for (let i = 0; i < treeItem.parentList.length; i++) {
      treeRef = treeRef[treeItem.parentList[i]].children!;
    }

    delete treeRef[treeItem.id];
    setTreeList(cloneDeep(originalTreeList));
  };

  const onClickRow = (item: TreeItem) => setSelectedRow(item);

  // target이 folder일때 : folder의 children으로 추가
  // target이 file일때 : file과 같은 레벨로 추가
  const onAddTree = (type: TreeItemType) => {
    const newId = uuid();

    const parentList = selectedRow
      ? selectedRow.type === "FOLDER"
        ? [...selectedRow.parentList, selectedRow.id]
        : selectedRow.parentList
      : [];

    const treeItem: SimpleTreeItem = {
      id: newId,
      type: type,
      parentList,
    };

    setTempItem(treeItem);
  };

  const onOpenModal = () => setShowGithubModal(true);
  const onCloseModal = async (args?: GithubTreeRequestArgs) => {
    setShowGithubModal(false);
    if (args) {
      try {
        setIsLoadingGithubTree(true);
        const treeData = await onRetrieveGithubTreeInfo(args);
        const listWithNameKey = transformGithubTreeResponse({
          tree: treeData.tree,
        });
        const listWithIdKey = replaceNameKeyToIdKey(listWithNameKey, {}, []);
        setTreeList(listWithIdKey);
        onChangeGithubURL(`https://github.com/${args.owner}/${args.repo}`);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingGithubTree(false);
      }
    }
  };

  const [normalizedList, setNormalizedList] = useState<TreeItem[]>(
    normalizeTreeData(treeList)
  );

  useEffect(() => {
    setNormalizedList(normalizeTreeData(treeList));
  }, [treeList]);

  const putTempItem = (putIn: boolean, treeItem: TreeItem) => {
    // 선택된 target이 없을때
    if (!treeItem?.parentList.length) {
      if (putIn) {
        setTreeList({ [treeItem.id]: { item: treeItem }, ...treeList });
      } else {
        const copiedList = cloneDeep(treeList);
        delete copiedList[treeItem.id];
        setTreeList(copiedList);
      }
      return;
    }

    const originalTreeList = cloneDeep(treeList);
    let treeRef = originalTreeList;
    for (let i = 0; i < treeItem.parentList.length; i++) {
      const parentId = treeItem.parentList[i];
      treeRef[parentId] = { children: {}, ...treeRef[parentId] };
      treeRef = treeRef[parentId].children!;
    }

    treeRef[treeItem.id] = { item: treeItem };
    setTreeList(originalTreeList);
  };

  useEffect(() => {
    if (tempItem) {
      const newItem = {
        ...tempItem,
        isTemporary: true,
        name: "",
        path: "",
      };
      putTempItem(true, newItem);
    }
  }, [tempItem?.id, selectedRow]);

  const onSave = (treeItem: TreeItem, name?: string) => {
    if (name) {
      const originalTreeList = cloneDeep(treeList);
      let treeRef = originalTreeList;
      for (let i = 0; i < treeItem.parentList.length; i++) {
        const parentId = treeItem.parentList[i];
        treeRef[parentId] = { children: {}, ...treeRef[parentId] };
        treeRef = treeRef[parentId].children!;
      }

      treeRef[treeItem.id].item.name = name;
      treeRef[treeItem.id].item.isTemporary = false;

      setTreeList(originalTreeList);
    } else {
      putTempItem(false, treeItem);
    }
    setTempItem(undefined);
  };

  if (isLoadingGithubTree) {
    return <div>loading..</div>;
  }

  return (
    <Fragment>
      <Button isFilled={false} onClick={onOpenModal}>
        <SVG name="github" fill="#77bc88" />
        github Repository에서 받아오기
      </Button>
      <ControlButton onAddTree={(itemType) => onAddTree(itemType)} />
      <Container>
        {normalizedList.length
          ? normalizedList.map((item) => {
              if (item.isTemporary) {
                return (
                  <TreeTempItem
                    key={item.id}
                    treeItem={item}
                    depth={item.parentList.length}
                    onSave={onSave}
                  />
                );
              }
              return (
                <TreeItem
                  onBlur={() => setSelectedRow(undefined)}
                  treeItem={item}
                  key={item.id}
                  depth={item.parentList.length}
                  onRemove={onRemove}
                  onClick={onClickRow}
                  isSelected={selectedRow?.id === item.id}
                />
              );
            })
          : "empty"}
      </Container>
      {showGithubModal && <GithubModal onClose={onCloseModal} />}
    </Fragment>
  );
}

const Container = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.palette.white};
    border: 1px solid ${theme.palette.gray4};
    border-radius: 8px;
    overflow: hidden;
    & > div:not(:last-child) {
      border-bottom: 1px solid ${theme.palette.gray4};
    }
  `}
`;
