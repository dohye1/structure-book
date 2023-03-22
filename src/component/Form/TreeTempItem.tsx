import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useRef } from "react";
import SVG from "../SVG";

type Props = {
  treeItem: TreeItem;
  depth: number;
  onSave: (treeItem: TreeItem, name?: string) => void;
};

export default function TreeTempItem({ treeItem, depth, onSave }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onBlur = () => {
    onSave(treeItem, inputRef.current?.value);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Escape") {
      onSave(treeItem);
    }

    if (e.key === "Tab" || e.key === "Enter") {
      onSave(treeItem, inputRef.current?.value);
    }
  };

  return (
    <Container depth={depth}>
      <SVG
        name={treeItem.type === "FOLDER" ? "folderOpen" : "file"}
        fill="#5E5E5E"
      />
      <Input onBlur={onBlur} autoFocus onKeyDown={onKeyDown} ref={inputRef} />
    </Container>
  );
}

const Container = styled.div<{ depth: number }>`
  ${({ theme, depth }) => css`
    width: 100%;
    height: 50px;
    column-gap: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: ${(depth + 1) * 16 + 16 + 12}px;
    padding-right: 16px;
    display: flex;
    cursor: pointer;
  `}
`;

const Input = styled.input`
  ${({ theme }) => css`
    display: flex;
    flex: 1;
    padding: 6px 12px;
    outline: none;
    border-radius: 4px;
    border: 1px solid ${theme.palette.gray7};
    &:focus {
      border: 1px solid ${theme.palette.orange4};
      outline: 2px solid ${theme.palette.orange5};
    }
  `}
`;
