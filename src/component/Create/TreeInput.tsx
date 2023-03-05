import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import Button from "../Button";
import ControlButton from "../ControlButton";
import GithubModal from "@/component/Create/GithubModal";
import SVG from "../SVG";
import TreeItem from "./TreeItem";
import TreeTempItem from "./TreeTempItem";
import useCreate from "@/hooks/useCreate";

type Props = {
  onChangeGithubURL: (githubURL: string) => void;
};

export default function TreeInput(props: Props) {
  const {
    showGithubModal,
    selectedRow,
    isLoadingGithubTree,
    normalizedList,
    containerRef,
    onRemove,
    onClickRow,
    onAddTree,
    onOpenModal,
    onCloseModal,
    onSave,
    onBlur,
  } = useCreate(props);

  if (isLoadingGithubTree) {
    return <div>loading..</div>;
  }

  return (
    <Container ref={containerRef}>
      <Button isFilled={false} onClick={onOpenModal}>
        <SVG name="github" fill="#77bc88" />
        github Repository에서 받아오기
      </Button>
      <ControlButton onAddTree={(itemType) => onAddTree(itemType)} />
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
                />
              );
            })
          : "empty"}
      </TreeList>
      {showGithubModal && <GithubModal onClose={onCloseModal} />}
    </Container>
  );
}

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
