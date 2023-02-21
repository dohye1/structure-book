import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Card from "./Card";

const cardList = Array.from({ length: 40 });

export default function CardList() {
  return (
    <Container>
      {cardList.map((card, index) => (
        <Card key={`card-${index}`} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => css`
    flex: 7;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  `}
`;
