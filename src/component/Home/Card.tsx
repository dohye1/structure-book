import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export default function Card() {
  return <Container>Card</Container>;
}

const Container = styled.div`
  ${({ theme }) => css`
    min-width: 200px;
    max-width: 500px;
    flex: 1;
    height: 100px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.palette.beige5};
  `}
`;
