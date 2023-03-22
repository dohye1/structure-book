import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { MultiValue } from "react-select";
import Button from "@/component/Button";
import TreeInput from "@/component/Form/TreeInput";
import { FormEvent, useRef, useState } from "react";
import TextEditor from "@/component/TextEditor";
import { Value } from "react-quill";
import StackSelect from "@/component/StackSelect";
import TextInput from "@/component/TextInput";

type Props = {
  defaultPost?: Post;
  onSubmit: (
    post: Pick<
      Post,
      "description" | "githubURL" | "stackList" | "title" | "treeList"
    >
  ) => void;
};

export default function PostForm({ onSubmit, defaultPost }: Props) {
  // TODO: hook으로 넣기
  const [title, setTitle] = useState(defaultPost?.title);
  const [stackList, setStackList] = useState<MultiValue<Stack>>(
    defaultPost?.stackList ?? []
  );
  const [githubURL, setGithubURL] = useState(defaultPost?.githubURL);
  const [description, setDescription] = useState<Value>(
    defaultPost?.description ?? ""
  );
  const onChangeGithubURL = (myGithubURL: string) => {
    setGithubURL(myGithubURL);
  };

  const treeListRef = useRef<{ getTreeList: () => TreeList }>();

  const onClickSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (title && stackList.length && treeListRef.current?.getTreeList()) {
      const descriptionStr = description as string;
      const treeList = treeListRef.current.getTreeList();
      onSubmit({
        title,
        stackList: stackList as Stack[],
        description: descriptionStr,
        treeList,
        githubURL,
      });
    }
  };

  return (
    <Container>
      <Form>
        <Title>Share your project structure</Title>
        <Item>
          <Label required>Title</Label>
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ex) Nextjs + Typescript boilerplate"
          />
        </Item>
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
          <TreeInput
            onChangeGithubURL={onChangeGithubURL}
            ref={treeListRef}
            defaultValue={defaultPost?.treeList}
          />
        </Item>
        <Item>
          <Label>Github URL</Label>
          <TextInput
            value={githubURL}
            onChange={(e) => onChangeGithubURL(e.target.value)}
            placeholder="ex) https://github.com/owner/repository"
          />
        </Item>
        <ButtonWrapper>
          <Button isFilled={false} variant="secondary">
            Temporary Save
          </Button>
          <Button variant="secondary" onClick={onClickSubmit}>
            Post
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

const ButtonWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 24px;
  `}
`;
