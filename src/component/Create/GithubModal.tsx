import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Modal from "../Modal";
import SVG from "../SVG";
import { Octokit } from "@octokit/rest";
import Select from "react-select";
import Button from "../Button";

type Props = {
  onClose: (args?: GithubTreeRequestArgs) => void;
};

const GITHUB_REGEX = /https:\/\/github.com\/(.*)\/(.*)/;

export default function GithubModal({ onClose }: Props) {
  const [branchOptions, setBranchOptions] = useState<Option<string>[]>([]);
  const [githubURL, setGithubURL] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<Option<string>>();
  const [error, setError] = useState("");
  const githubRef = useRef<GithubTreeRequestArgs>();

  const validationCheck = GITHUB_REGEX.test(githubURL);

  const onRetrieveGithubBranch = async () => {
    const result = GITHUB_REGEX.exec(githubURL);
    if (result) {
      const owner = result[1];
      const repository = result[2];
      try {
        if (owner && repository) {
          const octokit = new Octokit();
          octokit.rest.repos
            .listBranches({
              owner,
              repo: repository,
            })
            .then((res) => {
              const branchList = res.data.map((branch) => ({
                label: branch.name,
                value: branch.commit.sha,
              }));
              const initialBranch = branchList[0];
              setBranchOptions(branchList);
              setSelectedBranch(initialBranch);
              githubRef.current = {
                owner,
                repo: repository,
                branch: initialBranch,
              };
            })
            .catch((error) => {
              if (error.message === "Not Found") {
                setError("접근할 수 없는 저장소입니다.");
              }
            });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Modal onClose={onClose}>
      <Container>
        <Header>
          <Title>Github Repository 가져오기</Title>
          <CloseButton onClick={() => onClose()}>
            <SVG name="close" />
          </CloseButton>
        </Header>
        <Form>
          <Item>
            <Label>Github URL </Label>

            <InputWrapper>
              <Input
                placeholder="ex) https://github.com/owner/repository"
                value={githubURL}
                onChange={(e) => {
                  if (!!error) {
                    setError("");
                  }
                  setGithubURL(e.target.value);
                }}
                isError={!!error}
              />
              <Button
                onClick={onRetrieveGithubBranch}
                disabled={!validationCheck}
              >
                등록
              </Button>
            </InputWrapper>
            {error && <Error>{error}</Error>}
          </Item>
          <Item>
            <Label>Choose Branch</Label>
            <Select
              id="select-branch"
              instanceId="select-branch"
              isDisabled={!branchOptions.length}
              options={branchOptions}
              value={selectedBranch}
              onChange={(value) => setSelectedBranch(value as Option<string>)}
              placeholder="Select target branch"
            />
          </Item>
        </Form>
        <Footer>
          <Button onClick={() => onClose()} size="small" isFilled={false}>
            닫기
          </Button>
          <Button
            size="small"
            onClick={() => {
              if (githubRef.current && selectedBranch) {
                onClose({
                  ...githubRef.current,
                  branch: selectedBranch,
                });
              }
            }}
          >
            선택 완료
          </Button>
        </Footer>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  ${({ theme }) => css`
    width: 600px;
    background-color: ${theme.palette.white};
    border-radius: 4px;
  `}
`;

const CloseButton = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
  `}
`;

const Header = styled.div`
  ${({ theme }) => css`
    width: 100%;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.palette.beige4};
  `}
`;

const Title = styled.p`
  ${({ theme }) => css`
    font-size: 20px;
    font-weight: 500;
    color: ${theme.palette.gray2};
  `}
`;

const Form = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: 16px;
    row-gap: 16px;
    width: 100%;
  `}
`;

const Item = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    row-gap: 4px;
  `}
`;

const Label = styled.div`
  ${({ theme }) => css`
    font-size: 16px;
    font-weight: 400;
    color: ${theme.palette.gray2};
  `}
`;

const Error = styled.p`
  ${({ theme }) => css`
    font-size: 12px;
    font-weight: 400;
    color: ${theme.palette.red4};
  `}
`;

const InputWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    column-gap: 16px;
  `}
`;

const Input = styled.input<{ isError?: boolean }>`
  ${({ theme, isError }) => css`
    padding: 8px 12px;
    flex: 1;
    ${isError &&
    css`
      border: 1px solid ${theme.palette.red3};
    `}
  `}
`;

const Footer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 16px;
    width: 100%;
    padding: 24px 0;
  `}
`;
