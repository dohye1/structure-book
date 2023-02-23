import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Select from "react-select";
import Button from "@/component/Button";
import TreeInput from "@/component/Create/TreeInput";
import { Octokit } from "@octokit/rest";
import SVG from "@/component/SVG";
import { useState } from "react";
import GithubModal from "@/component/Create/GithubModal";

const MOCK_OPTION = [
  { label: "React", value: 1 },
  { label: "Svelte", value: 2 },
  { label: "Vue", value: 3 },
];

const MOCK_TREE: TreeList = [
  {
    item: { id: "test1", type: "FOLDER", name: "test" },
    children: [
      {
        item: { id: "test2", type: "FOLDER", name: "test2222" },
        children: [{ item: { id: "test3", type: "FILE", name: "test3333" } }],
      },
    ],
  },
  {
    item: { id: "folderOnly", type: "FOLDER", name: "folderOnly" },
  },
  {
    item: { id: "test4", type: "FOLDER", name: "test444444" },
    children: [
      {
        item: { id: "test5", type: "FOLDER", name: "test55555" },
        children: [
          {
            item: { id: "test6", type: "FOLDER", name: "test66666" },
            children: [
              { item: { id: "test77777", type: "FILE", name: "test777777" } },
            ],
          },
        ],
      },
    ],
  },
];

const onRetrieveGithubTreeInfo = async (args: GithubTreeRequestArgs) => {
  const octokit = new Octokit();

  const requestConfig = {
    owner: args.owner,
    repo: args.repo,
    tree_sha: args.branch.value,
    recursive: "1",
  };

  const treeData = await octokit.rest.git.getTree(requestConfig);
  return treeData.data;
};

export default function Create() {
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [isLoadingGithubTree, setIsLoadingGithubTree] = useState(false);

  const onOpenModal = () => setShowGithubModal(true);
  const onCloseModal = async (args?: GithubTreeRequestArgs) => {
    setShowGithubModal(false);
    if (args) {
      try {
        setIsLoadingGithubTree(true);
        const treeData = await onRetrieveGithubTreeInfo(args);
        // treeData를 가공해야한다.
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingGithubTree(false);
      }
    }
  };

  return (
    <>
      <Container>
        <Form>
          <Title>Share your project structure</Title>
          <Item>
            <Label>stack</Label>
            <Select options={MOCK_OPTION} />
          </Item>
          <Item>
            <Label>description</Label>
            <Textarea />
          </Item>
          <Item>
            <Label>tree</Label>
            <Button isFilled={false} onClick={onOpenModal}>
              <SVG name="github" fill="#77bc88" />
              github Repository에서 받아오기
            </Button>
            <TreeInput isLoading={isLoadingGithubTree} treeList={MOCK_TREE} />
          </Item>
          <Item>
            <Label>github URL</Label>
            <Input />
          </Item>
          <ButtonWrapper>
            <Button isFilled={false}>Save</Button>
            <Button>Create</Button>
          </ButtonWrapper>
        </Form>
      </Container>
      {showGithubModal && <GithubModal onClose={onCloseModal} />}
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
