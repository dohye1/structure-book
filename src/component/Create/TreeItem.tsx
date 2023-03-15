import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import SVG from "../SVG";

type Props = {
  treeItem: TreeItem;
  depth: number;
  onRemove?: (treeItem: TreeItem) => void;
  onClick?: (treeItem: TreeItem) => void;
  onChangeItemName?: (treeItem: TreeItem, name: string) => void;
  isSelected?: boolean;
  readOnly?: boolean;
};

export default function TreeItem({
  treeItem,
  depth,
  isSelected = false,
  onRemove,
  onClick,
  onChangeItemName,
  readOnly,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(treeItem.name);

  const onSave = () => {
    setEditMode(false);
    if (editMode && treeItem.name !== editedName) {
      onChangeItemName?.(treeItem, editedName);
    }
  };

  return (
    <Container
      depth={depth}
      onClick={() => onClick?.(treeItem)}
      isSelected={isSelected}
    >
      <Toggle>
        {treeItem.type === "FOLDER" && (
          <SVG
            name={treeItem.isOpen ? "chevronDown" : "chevronRight"}
            fill="#312D23"
          />
        )}
      </Toggle>
      <TreeInfo>
        <SVG
          name={treeItem.type === "FOLDER" ? "folderOpen" : "file"}
          fill="#5E5E5E"
        />
        {editMode ? (
          <EditInput
            value={editedName}
            autoFocus
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") {
                onSave();
              }
            }}
            onBlur={() => {
              onSave();
            }}
            onFocus={(e) => e.stopPropagation()}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          <>
            <NameWrapper>
              <Name>{treeItem.name}</Name>
            </NameWrapper>
            {!readOnly && (
              <>
                <RemoveButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditMode(true);
                  }}
                >
                  <SVG name="edit" fill="currentcolor" width={12} height={12} />
                </RemoveButton>
                <RemoveButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove?.(treeItem);
                  }}
                >
                  <SVG
                    name="trash"
                    fill="currentcolor"
                    width={12}
                    height={12}
                  />
                </RemoveButton>
              </>
            )}
          </>
        )}
      </TreeInfo>
    </Container>
  );
}

const Toggle = styled.div`
  width: 16px;
  height: 16px;
`;

const EditInput = styled.input`
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
    flex: 1;
  `}
`;

const Container = styled.div<{ depth: number; isSelected: boolean }>`
  ${({ theme, depth, isSelected }) => css`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: ${(depth + 1) * 16}px;
    padding-right: 16px;
    display: flex;
    cursor: pointer;
    column-gap: 12px;
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
    flex: 1;
  `}
`;

const Name = styled.p`
  ${({ theme }) => css`
    font-size: 12px;
    font-weight: 500;
    color: ${theme.palette.gray1};
  `}
`;
