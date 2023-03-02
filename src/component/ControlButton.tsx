import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import SVG from "./SVG";

// TODO: common component로 정리
type Props = {
  onAddTree: (type: TreeItemType) => void;
};

export default function ControlButton({ onAddTree }: Props) {
  return (
    <Container>
      <CommonButton onClick={() => onAddTree("FOLDER")}>
        <SVG name="folderAdd" width={24} height={24} fill="#5E5E5E" />
      </CommonButton>
      <CommonButton onClick={() => onAddTree("FILE")}>
        <SVG name="fileAdd" width={24} height={24} fill="#5E5E5E" />
      </CommonButton>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => css`
    width: fit-content;
    border-radius: 4px;
    border: 1px solid ${theme.palette.gray4};
    background-color: ${theme.palette.gray8};
    overflow: hidden;
  `}
`;

const CommonButton = styled.button`
  ${({ theme }) => css`
    border: none;
    padding: 6px 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: ${theme.palette.gray7};
    }
    &:not(:last-child) {
      border-right: 1px solid ${theme.palette.gray4};
    }
  `}
`;
