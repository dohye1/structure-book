import styled from "@emotion/styled";
import { css } from "@emotion/react";
import PostForm from "@/component/Form/PostForm";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { createPost } from "./api/post.api";
import userStore from "@/store/userStore";
import { createStacks } from "./api/stack.api";

export default function Create() {
  const router = useRouter();
  const { mutate } = useMutation(["post", "create"], createPost, {
    onSuccess: (id) => {
      if (id) {
        router.replace(`/post/${id}`);
      }
    },
  });

  const user = userStore((state) => state.user);

  const onSubmit = async (
    post: Pick<
      Post,
      "description" | "githubURL" | "stackList" | "title" | "treeList"
    >
  ) => {
    try {
      if (user) {
        const { title, stackList, githubURL, description, treeList } = post;
        await createStacks(stackList as Stack[]);
        const descriptionStr = description as string;
        mutate({
          title,
          writer: user,
          stackList: stackList as Stack[],
          description: descriptionStr,
          treeList,
          githubURL,
        });
      }
    } catch (error) {
      // FIXME: ERROR 처리 꼭 필요
      console.log();
    }
  };

  return (
    <Container>
      <PostForm onSubmit={onSubmit} />
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
  `}
`;
