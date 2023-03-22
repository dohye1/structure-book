import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { forwardRef, useImperativeHandle } from "react";
import Button from "../Button";
import ControlButton from "../ControlButton";
import GithubModal from "@/component/Form/GithubModal";
import SVG from "../SVG";
import TreeItem from "./TreeItem";
import TreeTempItem from "./TreeTempItem";
import useTree from "@/hooks/useTree";

type Props = {
  defaultValue?: TreeList;
  onChangeGithubURL: (githubURL: string) => void;
};

const TreeInput = forwardRef<
  { getTreeList: () => TreeList } | undefined,
  Props
>((props, ref) => {
  const {
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
    onSave,
    onChangeItemName,
  } = useTree(props);

  useImperativeHandle(ref, () => ({
    getTreeList: () => treeList,
  }));

  if (isLoadingGithubTree) {
    return <div>loading..</div>;
  }

  return (
    <Container ref={containerRef}>
      <ButtonWrapper>
        <ControlButton onAddTree={(itemType) => onAddTree(itemType)} />
        <Button
          isFilled={false}
          onClick={onOpenModal}
          type="button"
          size="small"
        >
          <SVG name="github" fill="#e5a766" />
          Retrieve from github
        </Button>
      </ButtonWrapper>
      <TreeList>
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
                  treeItem={item}
                  key={item.id}
                  depth={item.parentList.length}
                  isSelected={selectedRow?.id === item.id}
                  onRemove={onRemove}
                  onClick={onClickRow}
                  onChangeItemName={onChangeItemName}
                />
              );
            })
          : "empty"}
      </TreeList>
      {showGithubModal && <GithubModal onClose={onCloseModal} />}
    </Container>
  );
});

TreeInput.displayName = "TreeInput";

export default TreeInput;

const ButtonWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
  `}
`;

const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  `}
`;

const TreeList = styled.div`
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
