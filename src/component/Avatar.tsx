import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
type Props = {
  src: string;
  size?: number;
  rounded?: boolean;
};

// TODO: empty image 제대로 설정해줘야함
export default function Avatar({ src, size = 40, rounded = true }: Props) {
  return (
    <UserImage rounded={rounded} size={size}>
      <Image
        width={size}
        height={size}
        loader={() => src ?? "default image"}
        src={"default image"}
        alt={src ?? "default image"}
      />
    </UserImage>
  );
}

const UserImage = styled.div<{ size: number; rounded: boolean }>`
  ${({ theme, rounded, size }) => css`
    width: ${size}px;
    height: ${size}px;
    background-color: ${theme.palette.beige2};
    overflow: hidden;
    ${rounded &&
    css`
      border-radius: 50%;
    `}
  `}
`;
