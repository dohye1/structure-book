import useOutsideClick from "@/hooks/useOutsideClick";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useRef } from "react";
import SVG from "../SVG";

type Props = {
  treeItem: TreeItem;
  depth: number;
  onRemove: (treeItem: TreeItem) => void;
  onClick: (treeItem: TreeItem) => void;
  onBlur: () => void;
  isSelected: boolean;
};

export default function TreeItem({
  treeItem,
  depth,
  onRemove,
  onClick,
  onBlur,
  isSelected,
}: Props) {
  const domRef = useRef<HTMLDivElement>(null);

  // useOutsideClick(domRef, onBlur);

  return (
    <Container
      ref={domRef}
      depth={depth}
      onClick={() => onClick(treeItem)}
      isSelected={isSelected}
    >
      <TreeInfo>
        <SVG
          name={treeItem.type === "FOLDER" ? "folderOpen" : "file"}
          fill="#5E5E5E"
        />
        <NameWrapper>
          <Name>{treeItem.name}</Name>
        </NameWrapper>
      </TreeInfo>
      <RemoveButton onClick={() => onRemove(treeItem)}>
        <SVG name="trash" fill="currentcolor" width={12} height={12} />
      </RemoveButton>
    </Container>
  );
}

const RemoveButton = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    & svg {
      color: ${theme.palette.beige5};
    }
    &:hover {
      & svg {
        color: ${theme.palette.beige3};
      }
    }
  `}
`;

const TreeInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    column-gap: 16px;
  `}
`;

const Container = styled.div<{ depth: number; isSelected: boolean }>`
  ${({ theme, depth, isSelected }) => css`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: ${(depth + 1) * 30}px;
    padding-right: 30px;
    display: flex;
    cursor: pointer;
    ${isSelected &&
    css`
      background-color: ${theme.palette.beige4};
    `}
  `}
`;

const NameWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    column-gap: 4px;
  `}
`;

const Name = styled.p`
  ${({ theme }) => css`
    font-size: 12px;
    font-weight: 500;
    color: ${theme.palette.gray1};
  `}
`;
