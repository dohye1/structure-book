import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

type Props = {
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ children, ...args }: Props) {
  return <Container {...args}>{children}</Container>;
}

const Container = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;
