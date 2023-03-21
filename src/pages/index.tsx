import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import SVG from "@/component/SVG";
import { getPostList } from "./api/post.api";
import PostCard from "@/component/Home/PostCard";
import { GetServerSideProps } from "next";

type Props = {
  postList: Post[];
};

export default function Home({ postList }: Props) {
  const router = useRouter();

  const onNavigateToDetail = (id: string) => {
    router.push(`/post/${id}`);
  };

  return (
    <Container>
      <SearchSection>
        <InputWrapper>
          <SVG name="search" />
          <Input placeholder="What project are you looking for?" />
        </InputWrapper>
      </SearchSection>
      <MainSection>
        <PostList>
          {postList.map((post, index) => (
            <PostCard
              key={`card-${index}`}
              post={post}
              onClick={onNavigateToDetail}
            />
          ))}
        </PostList>
      </MainSection>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const postList = await getPostList();

  return {
    props: { postList: postList ?? [] },
  };
};

const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    ${theme.media.desktop`
      width:1000px;
    `}
    ${theme.media.tablet`
      width:800px;
    `}
    ${theme.media.mobile`
      width: 100%;
    `}
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
    display: flex;
    justify-content: center;
  `}
`;

const PostList = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  `}
`;
