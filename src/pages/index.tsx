import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import SVG from "@/component/SVG";
import Filter from "@/component/Home/Filter";
import CardList from "@/component/Home/CardList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Container>
      <SearchSection>
        <InputWrapper>
          <SVG name="search" />
          <Input placeholder="What project are you looking for?" />
        </InputWrapper>
      </SearchSection>
      <MainSection>
        <Filter />
        <CardList />
      </MainSection>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
  `}
`;

const SearchSection = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    align-items: center;
    padding: 60px 0;
    box-sizing: border-box;
  `}
`;
const InputWrapper = styled.div`
  ${({ theme }) => css`
    min-width: 340px;
    display: flex;
    column-gap: 8px;
    align-items: center;
    border-radius: 16px;
    padding: 10px 16px;
    background-color: ${theme.palette.white};
  `}
`;

const Input = styled.input`
  ${({ theme }) => css`
    outline: none;
    border: none;
    width: 100%;
    font-size: 18px;
    font-weight: 400;
    color: ${theme.palette.gray2};
  `}
`;

const MainSection = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.palette.beige2};
    display: flex;
    padding: 20px 40px;
    column-gap: 30px;
    justify-content: space-between;
  `}
`;
