import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { deletePost, getPostDetail } from "../api/post.api";
import TextEditor from "@/component/TextEditor";
import TreeItem from "@/component/Form/TreeItem";
import {
  getTreeStructureByCode,
  normalizeTreeData,
  updateTreeItemInfo,
} from "@/utils/tree.util";
import { useState } from "react";
import userStore from "@/store/userStore";
import Avatar from "@/component/Avatar";
import Button from "@/component/Button";
import { GetServerSideProps, Redirect } from "next";
import SVG from "@/component/SVG";
import Tooltip from "@/component/Tooltip";

type Props = {
  postDetail: Post;
};

export default function Post({ postDetail }: Props) {
  const router = useRouter();
  const user = userStore((state) => state.user);
  const [treeList, setTreeList] = useState<TreeList>(postDetail.treeList);

  const { mutate: deleteMutate } = useMutation(
    ["post", "delete", postDetail.id],
    (postId: string) => deletePost(postId),
    {
      onSuccess: () => {
        router.replace("/");
      },
    }
  );

  const onClickRow = (item: TreeItem) => {
    if (treeList && item.type === "FOLDER") {
      const updatedList = updateTreeItemInfo(treeList, item, {
        isOpen: !item.isOpen,
      });
      setTreeList(updatedList);
    }
  };

  const onEdit = (id: string) => {
    router.replace(`/edit/${id}`);
  };

  const onCopyStructure = (targetValue: TreeList) => {
    const structureStr = getTreeStructureByCode(targetValue);
    navigator.clipboard.writeText(structureStr).then(
      () => {
        /* clipboard successfully set */
        alert("복사 성공");
      },
      () => {
        /* clipboard write failed */
        alert("복사 실패");
      }
    );
  };

  const { stackList, description, githubURL, writer, title, id } = postDetail;
  const normalizedList = normalizeTreeData(treeList);

  const isMyPost = writer.id === user?.id;

  return (
    <Container>
      <Header>
        <UserInfo>
          <Avatar src={writer.photoURL ?? undefined} />
          <Writer>{writer.displayName}</Writer>
        </UserInfo>
        {isMyPost && (
          <ButtonWrapper>
            <Button
              variant="secondary"
              size="small"
              isFilled={false}
              onClick={() => onEdit(id)}
            >
              Edit
            </Button>
            <Button
              variant="secondary"
              size="small"
              isFilled={false}
              onClick={() => deleteMutate(id)}
            >
              Remove
            </Button>
          </ButtonWrapper>
        )}
      </Header>
      <Content>
        <Title>{title}</Title>
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
          <Label>
            Tree
            <Tooltip tooltipContent="copy">
              <DuplicateButton onClick={() => onCopyStructure(treeList)}>
                <SVG name="duplicate" />
              </DuplicateButton>
            </Tooltip>
          </Label>
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
    align-items: center;
    justify-content: space-between;
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
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
`;

const DuplicateButton = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    svg path {
      fill: ${theme.palette.beige5};
    }
    &:hover {
      svg path {
        fill: ${theme.palette.beige7};
      }
    }
  `}
`;

const Title = styled.div`
  ${({ theme }) => css`
    font-size: 1.6rem;
    font-weight: 500;
    color: ${theme.palette.gray2};
  `}
`;

const StackList = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  `}
`;

const ButtonWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
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
