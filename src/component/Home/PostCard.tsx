import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Avatar from "../Avatar";
import SVG from "../SVG";

type Props = {
  post: Post;
  onClick: (postId: string) => void;
};

export default function PostCard({ onClick, post }: Props) {
  const { stackList, writer, title } = post;
  return (
    <Container onClick={() => onClick(post.id)}>
      <TopSection>
        <UserInfo>
          <Avatar src={writer.photoURL ?? ""} size={24} />
          <Writer>{writer.displayName}</Writer>
        </UserInfo>
        <IconWrapper>
          <Icon>
            <SVG name="heartFilled" fill="#f55a4e" width={16} height={16} /> 4
          </Icon>
          <Icon>
            <SVG name="eye" fill="#8C877A" width={16} height={16} /> 4
          </Icon>
          <Icon>
            <SVG name="comment" fill="#8C877A" width={16} height={16} /> 4
          </Icon>
        </IconWrapper>
      </TopSection>
      <Title>{title}</Title>
      <StackList>
        {stackList.map((stack) => (
          <Stack key={stack.value}>{stack.label}</Stack>
        ))}
      </StackList>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => css`
    margin: 1rem;
    height: fit-content;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    padding: 16px;
    row-gap: 16px;
    box-sizing: border-box;
    align-items: flex-start;
    justify-content: flex-start;
    cursor: pointer;
    background-color: ${theme.palette.gray8};
    box-shadow: 0px 4px 16px 0px rgba(107, 105, 105, 0.2);
    ${theme.media.desktop`
      width:calc(33.3% - 2rem);
    `}
    ${theme.media.tablet`
      width: calc(50% - 2rem);
    `}
    ${theme.media.mobile`
      width: 100%;
    `}
  `}
`;

const StackList = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  `}
`;

const Stack = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.palette.orange5};
    padding: 6px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    color: ${theme.palette.white};
  `}
`;

const Writer = styled.p`
  ${({ theme }) => css`
    font-size: 16px;
    font-weight: 700;
    color: ${theme.palette.gray2};
  `}
`;

const Title = styled.p`
  ${({ theme }) => css`
    height: 60px;
    font-size: 16px;
    font-weight: 500;
    color: ${theme.palette.gray2};
    white-space: normal;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    box-orient: vertical;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;
const UserInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    column-gap: 8px;
  `}
`;

const TopSection = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  `}
`;

const IconWrapper = styled.div`
  ${({ theme }) => css`
    width: fit-content;
    display: flex;
    align-items: center;
    column-gap: 12px;
  `}
`;

const Icon = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    column-gap: 2px;
    font-size: 12px;
    font-weight: 500;
    color: ${theme.palette.beige3};
  `}
`;
