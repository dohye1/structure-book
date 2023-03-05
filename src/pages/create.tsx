import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Select from "react-select";
import Button from "@/component/Button";
import TreeInput from "@/component/Create/TreeInput";
import { useState } from "react";

const MOCK_OPTION = [
  { label: "React", value: 1 },
  { label: "Svelte", value: 2 },
  { label: "Vue", value: 3 },
];

export default function Create() {
  // TODO: hook으로 넣기
  const [githubURL, setGithubURL] = useState("");

  const onChangeGithubURL = (myGithubURL: string) => {
    setGithubURL(myGithubURL);
  };

  return (
    <>
      <Container>
        <Form>
          <Title>Share your project structure</Title>
          <Item>
            <Label>stack</Label>
            <Select
              options={MOCK_OPTION}
              onChange={() => {}}
              id="select-project-stack"
              instanceId="select-project-stack"
              isMulti
            />
          </Item>
          <Item>
            <Label>description</Label>
            <Textarea />
          </Item>
          <Item>
            <Label>tree</Label>
            <TreeInput onChangeGithubURL={onChangeGithubURL} />
          </Item>
          <Item>
            <Label>github URL</Label>
            <Input value={githubURL} onChange={() => {}} />
          </Item>
          <ButtonWrapper>
            <Button isFilled={false}>Save</Button>
            <Button>Create</Button>
          </ButtonWrapper>
        </Form>
      </Container>
    </>
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
    color: ${theme.palette.gray1};
    margin-bottom: 24px;
  `}
`;

const Form = styled.div`
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

const Label = styled.div`
  ${({ theme }) => css`
    font-size: 20px;
    font-weight: 400;
    color: ${theme.palette.gray1};
  `}
`;

const Input = styled.input`
  ${({ theme }) => css`
    padding: 8px 16px;
  `}
`;

const Textarea = styled.textarea`
  ${({ theme }) => css`
    min-height: 100px;
    padding: 16px;
    outline: none;
    font-family: inherit;
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
