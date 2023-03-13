import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getPostDetail } from "../api/post.api";
import TextEditor from "@/component/TextEditor";
import TreeItem from "@/component/Create/TreeItem";
import { normalizeTreeData, updateTreeItemInfo } from "@/utils/tree.util";
import { useState } from "react";
import Avatar from "@/component/Avatar";

export default function Post() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [treeList, setTreeList] = useState<TreeList>();

  const { data } = useQuery(["post", "detail", id], () => getPostDetail(id), {
    onSuccess: (data) => {
      if (data) {
        setTreeList(data.treeList);
      }
    },
  });

  const onClickRow = (item: TreeItem) => {
    if (treeList && item.type === "FOLDER") {
      const updatedList = updateTreeItemInfo(treeList, item, {
        isOpen: !item.isOpen,
      });
      setTreeList(updatedList);
    }
  };

  if (!data) {
    return <div>???</div>;
  }

  const { stackList, description, githubURL, writer } = data;
  const normalizedList = normalizeTreeData(treeList);

  return (
    <Container>
      <Header>
        <UserInfo>
          <Avatar src={writer.photoURL ?? undefined} />
          <Writer>{writer.displayName}</Writer>
        </UserInfo>
      </Header>
      <Content>
        <Item>
          <Label>Stack</Label>
          <StackList>
            {stackList.map((stack) => (
              <Stack key={stack.value}>{stack.label}</Stack>
            ))}
          </StackList>
        </Item>
        {description && (
          <Item>
            <Label>Description</Label>
            <TextEditor value={description} readOnly />
          </Item>
        )}
        <Item>
          <Label>Tree</Label>
          <TreeList>
            {normalizedList.length
              ? normalizedList.map((item) => {
                  return (
                    <TreeItem
                      treeItem={item}
                      key={item.id}
                      depth={item?.parentList.length}
                      readOnly
                      onClick={onClickRow}
                    />
                  );
                })
              : "empty"}
          </TreeList>
        </Item>
        <Item>
          <Label>Github URL</Label>
          {githubURL}
        </Item>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 600px;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
    padding-bottom: 100px;
  `}
`;

const UserInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    column-gap: 16px;
  `}
`;
const Writer = styled.p`
  ${({ theme }) => css`
    font-size: 16px;
    font-weight: 700;
    color: ${theme.palette.gray2};
  `}
`;

const Header = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
  `}
`;

const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    row-gap: 24px;
    width: 100%;
  `}
`;

const Item = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    row-gap: 14px;
  `}
`;

const Label = styled.div`
  ${({ theme }) => css`
    font-size: 20px;
    font-weight: 400;
    color: ${theme.palette.beige9};
    width: 100%;
    background-color: ${theme.palette.beige4};
    border-radius: 4px;
    padding: 4px;
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
    background-color: ${theme.palette.orange5};
    padding: 4px 6px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    color: ${theme.palette.white};
  `}
`;

const TreeList = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.palette.white};
    border: 1px solid ${theme.palette.gray4};
    border-radius: 8px;
    overflow: hidden;
    & > div:not(:last-child) {
      border-bottom: 1px solid ${theme.palette.gray4};
    }
  `}
`;
