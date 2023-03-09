import { normalizeTreeData, updateTreeItemInfo } from "@/utils/tree.util";
import { cloneDeep } from "lodash";
import { v4 as uuid } from "uuid";
import { useState, useEffect, useRef } from "react";
import {
  onRetrieveGithubTreeInfo,
  replaceNameKeyToIdKey,
  transformGithubTreeResponse,
} from "@/utils/tree.util";
import useOutsideClick from "./useOutsideClick";

type Props = {
  onChangeGithubURL: (githubURL: string) => void;
};

export default function useTree({ onChangeGithubURL }: Props) {
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [isLoadingGithubTree, setIsLoadingGithubTree] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TreeItem>();

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
          isOpen: false,
        },
      },
    };
  });

  const [normalizedList, setNormalizedList] = useState<TreeItem[]>(
    normalizeTreeData(treeList)
  );

  const containerRef = useRef<HTMLDivElement>(null);

  // =======TreeItem Action=======
  // FIXME: 뭔가 putTempItem랑 합쳐질수있을것같기도한디?
  const onRemove = (treeItem: TreeItem) => {
    if (selectedRow?.id === treeItem.id) {
      setSelectedRow(undefined);
    }
    let originalTreeList = cloneDeep(treeList);
    let treeRef = originalTreeList;

    for (let i = 0; i < treeItem.parentList.length; i++) {
      treeRef = treeRef[treeItem.parentList[i]].children!;
    }

    delete treeRef[treeItem.id];
    setTreeList(cloneDeep(originalTreeList));
  };

  // row selection과 toggle이 동시에 발생함
  const onClickRow = (item: TreeItem) => {
    if (item.type === "FOLDER") {
      const updatedList = updateTreeItemInfo(treeList, item, {
        isOpen: !item.isOpen,
      });
      setTreeList(updatedList);
    }
    setSelectedRow(item);
  };

  const putTempItem = (putIn: boolean, treeItem: TreeItem) => {
    // 선택된 target이 없을때
    const originalTreeList = cloneDeep(treeList);

    if (!treeItem?.parentList.length) {
      if (putIn) {
        setTreeList({ [treeItem.id]: { item: treeItem }, ...treeList });
      } else {
        delete originalTreeList[treeItem.id];
        setTreeList(originalTreeList);
      }
      return;
    }

    let treeRef = originalTreeList;
    for (let i = 0; i < treeItem.parentList.length; i++) {
      const parentId = treeItem.parentList[i];
      treeRef[parentId] = { children: {}, ...treeRef[parentId] };

      if (
        selectedRow?.type === "FOLDER" &&
        treeRef[parentId].item.id === selectedRow?.id
      ) {
        treeRef[parentId].item.isOpen = true;
      }
      treeRef = treeRef[parentId].children!;
    }

    if (putIn) {
      treeRef[treeItem.id] = { item: treeItem };
    } else {
      delete treeRef[treeItem.id];
    }
    setTreeList(originalTreeList);
  };

  const onSave = (treeItem: TreeItem, name?: string) => {
    if (name) {
      const updatedList = updateTreeItemInfo(treeList, treeItem, {
        name,
        isTemporary: false,
      });
      setTreeList(updatedList);
    } else {
      putTempItem(false, treeItem);
    }
  };

  const onBlur = () => {
    setSelectedRow(undefined);
  };
  // =======TreeItem Action=======

  // =======TreeItemList Action=======
  // target이 folder일때 : folder의 children으로 추가
  // target이 file일때 : file과 같은 레벨로 추가
  const onAddTree = (type: TreeItemType) => {
    const newId = uuid();

    const parentList = selectedRow
      ? selectedRow.type === "FOLDER"
        ? [...selectedRow.parentList, selectedRow.id]
        : selectedRow.parentList
      : [];

    const newItem = {
      id: newId,
      type: type,
      parentList,
      isTemporary: true,
      name: "",
      path: "",
      isOpen: false,
    };
    putTempItem(true, newItem);
  };

  // =======TreeItemList Action=======

  //=======Modal Action=======
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
  //=======Modal Action=======

  useEffect(() => {
    setNormalizedList(normalizeTreeData(treeList));
  }, [treeList]);

  useOutsideClick(containerRef, onBlur);

  return {
    showGithubModal,
    selectedRow,
    isLoadingGithubTree,
    normalizedList,
    containerRef,
    treeList,
    onRemove,
    onClickRow,
    onAddTree,
    onOpenModal,
    onCloseModal,
    putTempItem,
    onSave,
    onBlur,
  };
}
