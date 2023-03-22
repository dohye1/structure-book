import styled from "@emotion/styled";
import { css } from "@emotion/react";
import PostForm from "@/component/Form/PostForm";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { editPost, getPostDetail } from "../api/post.api";
import { createStacks } from "../api/stack.api";
import { GetServerSideProps } from "next";

type Props = {
  postDetail: Post;
};

export default function Edit({ postDetail }: Props) {
  const router = useRouter();
  const { mutate } = useMutation(["post", "create"], editPost, {
    onSuccess: () => {
      router.replace(`/post/${postDetail.id}`);
    },
  });

  const onSubmit = async (
    post: Pick<
      Post,
      "description" | "githubURL" | "stackList" | "title" | "treeList"
    >
  ) => {
    try {
      const { title, stackList, githubURL, description, treeList } = post;
      await createStacks(stackList as Stack[]);
      const descriptionStr = description as string;
      mutate({
        id: postDetail.id,
        writer: postDetail.writer,
        title,
        stackList: stackList as Stack[],
        description: descriptionStr,
        treeList,
        githubURL,
      });
    } catch (error) {
      // FIXME: ERROR 처리 꼭 필요
      console.log();
    }
  };

  return (
    <Container>
      <PostForm onSubmit={onSubmit} defaultPost={postDetail} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.query as { id: string };
  const postDetail = await getPostDetail(id);

  if (!postDetail) {
    return {
      redirect: {
        statusCode: 301,
        destination: "/",
      },
    };
  }

  return {
    props: { postDetail },
  };
};

const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
  `}
`;
