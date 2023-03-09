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
  const { githubURL, description, stackList, writer } = post;
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
    min-width: 100px;
    max-width: 300px;
    flex: 1;
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
    background-color: ${theme.palette.beige6};
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
    background-color: ${theme.palette.green3};
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
