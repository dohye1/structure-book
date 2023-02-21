import React from "react";
import Head from "next/head";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

function Header() {
  return (
    <Container>
      <Logo>STRUCTURE BOOK</Logo>
      <User />
    </Container>
  );
}

export default Header;

const Container = styled.div`
  ${({ theme }) => css`
    height: 60px;
    background-color: ${theme.palette.beige3};
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
`;

const Logo = styled.div`
  ${({ theme }) => css`
    height: 60px;
    background-color: ${theme.palette.beige3};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
    color: ${theme.palette.beige5};
  `}
`;

const User = styled.div`
  ${({ theme }) => css`
    width: 40px;
    height: 40px;
    background-color: ${theme.palette.beige2};
    border-radius: 50%;
  `}
`;
