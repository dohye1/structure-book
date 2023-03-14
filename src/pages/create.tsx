import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { MultiValue } from "react-select";
import { useRouter } from "next/router";
import Button from "@/component/Button";
import TreeInput from "@/component/Create/TreeInput";
import { FormEvent, useRef, useState } from "react";
import TextEditor from "@/component/TextEditor";
import { Value } from "react-quill";
import { useMutation } from "react-query";
import { createPost } from "./api/post.api";
import userStore from "@/store/userStore";
import StackSelect from "@/component/StackSelect";
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

  // TODO: hook으로 넣기
  const [stackList, setStackList] = useState<MultiValue<Stack>>([]);
  const [githubURL, setGithubURL] = useState("");
  const [description, setDescription] = useState<Value>("");
  const onChangeGithubURL = (myGithubURL: string) => {
    setGithubURL(myGithubURL);
  };

  const treeListRef = useRef<{ getTreeList: () => TreeList }>();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (treeListRef.current?.getTreeList()) {
        await createStacks(stackList as Stack[]);
        const descriptionStr = description as string;
        const treeList = treeListRef.current.getTreeList();
        if (user) {
          mutate({
            writer: user,
            stackList: stackList as Stack[],
            description: descriptionStr,
            treeList,
            githubURL,
          });
        }
      }
    } catch (error) {
      // FIXME: ERROR 처리 꼭 필요
      console.log();
    }
  };

  return (
    <Container>
      <Form>
        <Title>Share your project structure</Title>
        <Item>
          <Label required>Stack</Label>
          <StackSelect value={stackList} onChange={setStackList} />
        </Item>
        <Item>
          <Label>Description</Label>
          <TextEditor value={description} onChange={setDescription} />
        </Item>
        <Item>
          <Label required>Tree</Label>
          <TreeInput onChangeGithubURL={onChangeGithubURL} ref={treeListRef} />
        </Item>
        <Item>
          <Label>Github URL</Label>
          <Input
            value={githubURL}
            onChange={(e) => onChangeGithubURL(e.target.value)}
            placeholder="ex) https://github.com/owner/repository"
          />
        </Item>
        <ButtonWrapper>
          <Button isFilled={false} variant="secondary">
            Save
          </Button>
          <Button variant="secondary" onClick={onSubmit}>
            Create
          </Button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
  `}
`;

const Title = styled.div`
  ${({ theme }) => css`
    font-size: 32px;
    font-weight: 500;
    align-self: center;
    color: ${theme.palette.gray4};
    margin-bottom: 24px;
  `}
`;

const Form = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    row-gap: 24px;
    width: 600px;
  `}
`;

const Item = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  `}
`;

const Label = styled.div<{ required?: boolean }>`
  ${({ theme, required }) => css`
    font-size: 20px;
    font-weight: 400;
    color: ${theme.palette.gray2};
    ${required &&
    css`
      &::after {
        content: "*";
        font-size: 18px;
        color: ${theme.palette.red2};
        margin-left: 2px;
        margin-bottom: 6px;
      }
    `}
  `}
`;

const Input = styled.input`
  ${({ theme }) => css`
    padding: 8px 16px;
  `}
`;

const ButtonWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 24px;
  `}
`;
