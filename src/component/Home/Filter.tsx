import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export default function Filter() {
  return <Container>Filter</Container>;
}

const Container = styled.div`
  ${({ theme }) => css`
    flex: 3;
    height: 500px;
    background-color: ${theme.palette.beige4};
    position: sticky;
    top: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  `}
`;
