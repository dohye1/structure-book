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
        `
      : css`
          background-color: ${theme.palette.white};
          color: ${theme.palette.green2};
        `}
  `}
`;
