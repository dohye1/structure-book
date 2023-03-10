import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import SVG from "@/component/SVG";
import Filter from "@/component/Home/Filter";
import { getPostList } from "./api/post.api";
import PostCard from "@/component/Home/PostCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useQuery(["post", "list"], getPostList);

  const onNavigateToDetail = (id: string) => {
    router.push(`/post/${id}`);
  };
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!data) {
    return <div>empty</div>;
  }

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
        <PostList>
          {data.map((post, index) => (
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

const PostList = styled.div`
  ${({ theme }) => css`
    flex: 8;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  `}
`;
