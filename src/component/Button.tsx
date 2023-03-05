import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

type ButtonSize = "small" | "regular";
type ButtonVariant = "primary" | "secondary";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  isFilled?: boolean;
  variant?: ButtonVariant;
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  ...args
}: Props) {
  return (
    <Container type={type} variant={variant} {...args}>
      {children}
    </Container>
  );
}

const Container = styled.button<{
  size?: ButtonSize;
  variant: ButtonVariant;
  isFilled?: boolean;
}>`
  ${({ theme, size = "regular", isFilled = true, variant }) => css`
    border: none;
    border-radius: 6px;
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
    ${variant === "primary" &&
    css`
      ${isFilled
        ? css`
            background-color: ${theme.palette.green2};
            color: ${theme.palette.white};
            &:hover {
              background-color: ${theme.palette.green1};
            }
            &:disabled {
              background-color: ${theme.palette.green7};
              cursor: default;
            }
          `
        : css`
            background-color: ${theme.palette.white};
            color: ${theme.palette.green2};
            border: 1px solid ${theme.palette.green2};
            &:hover {
              color: ${theme.palette.green1};
              border: 1px solid ${theme.palette.green1};
            }
            &:disabled {
              color: ${theme.palette.green7};
              border: 1px solid ${theme.palette.green7};
              cursor: default;
            }
          `}
    `}
    ${variant === "secondary" &&
    css`
      ${isFilled
        ? css`
            background-color: ${theme.palette.beige3};
            color: ${theme.palette.white};
            &:hover {
              background-color: ${theme.palette.beige2};
            }
            &:disabled {
              background-color: ${theme.palette.beige7};
              cursor: default;
            }
          `
        : css`
            background-color: ${theme.palette.white};
            color: ${theme.palette.beige3};
            border: 1px solid ${theme.palette.beige3};
            &:hover {
              color: ${theme.palette.beige2};
              border: 1px solid ${theme.palette.beige2};
            }
            &:disabled {
              color: ${theme.palette.beige7};
              border: 1px solid ${theme.palette.beige7};
              cursor: default;
            }
          `}
    `}
  `}
`;
