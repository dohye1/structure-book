import { makeStructureTree } from "@/utils/tree.util";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { ReactNode } from "react";

type Props = {
  isLoading?: boolean;
  treeList?: TreeList;
  onRemove: (item: TreeItem) => void;
};

export default function TreeInput({ isLoading, treeList, onRemove }: Props) {
  if (isLoading) {
    return <div>loading..</div>;
  }

  if (!treeList) {
    return <div>empty data</div>;
  }

  const renderTreeList = Object.values(treeList).map((treeInfo) => {
    const list: ReactNode[] = [];
    return makeStructureTree({ list, treeInfo, onRemove });
  });

  return <Container>{renderTreeList}</Container>;
}

const Container = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.palette.white};
    border: 1px solid ${theme.palette.gray4};
    border-radius: 8px;
    & > div:not(:last-child) {
      border-bottom: 1px solid ${theme.palette.gray4};
    }
  `}
`;
