import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

type ButtonSize = "small" | "regular";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  isFilled?: boolean;
};

export default function Button({ children, ...args }: Props) {
  return <Container {...args}>{children}</Container>;
}

const Container = styled.button<{ size?: ButtonSize; isFilled?: boolean }>`
  ${({ theme, size = "regular", isFilled = true }) => css`
    border: none;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 4px;
    cursor: pointer;
    box-sizing: border-box;
    border: 1px solid transparent;
    ${size === "small" &&
    css`
      padding: 10px 14px;
    `}
    ${size === "regular" &&
    css`
      padding: 12px 16px;
    `}
    ${isFilled
      ? css`
          background-color: ${theme.palette.green2};
          color: ${theme.palette.white};
          &:disabled {
            background-color: ${theme.palette.green7};
            cursor: default;
          }
        `
      : css`
          background-color: ${theme.palette.white};
          color: ${theme.palette.green2};
          border: 1px solid ${theme.palette.green2};
          &:disabled {
            color: ${theme.palette.green7};
            border: 1px solid ${theme.palette.green7};
            cursor: default;
          }
        `}
  `}
`;
