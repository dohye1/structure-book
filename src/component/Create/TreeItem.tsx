import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import Button from "../Button";
import SVG from "../SVG";

type Props = {
  treeItem: TreeItem;
  depth: number;
};

// TODO:
// 1. 이름 수정기능
// 2. description입력방식 생각해보기
// 3. 삭제기능

export default function TreeItem({ treeItem, depth }: Props) {
  return (
    <Container depth={depth}>
      <TreeInfo>
        <SVG
          name={treeItem.type === "FOLDER" ? "folderOpen" : "file"}
          fill="#5E5E5E"
        />
        <Name>{treeItem.name}</Name>
      </TreeInfo>
      <RemoveButton>
        <SVG name="trash" fill="currentcolor" />
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
      color: #beb9ab;
    }
    &:hover {
      & svg {
        color: #8c877a;
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

const Container = styled.div<{ depth: number }>`
  ${({ theme, depth }) => css`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: ${(depth + 1) * 30}px;
    padding-right: 30px;
    display: flex;
  `}
`;

const Name = styled.p`
  ${({ theme }) => css`
    font-size: 12px;
    font-weight: 500;
    color: ${theme.palette.gray1};
  `}
`;
