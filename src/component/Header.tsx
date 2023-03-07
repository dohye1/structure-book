import React from "react";
import Button from "./Button";
import Image from "next/image";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import userStore from "@/store/userStore";
import useLogin from "@/hooks/useLogin";

function Header() {
  const router = useRouter();
  const user = userStore((state) => state.user);
  const { githubLogin } = useLogin();

  const onNavigateToHome = () => {
    router.push("/");
  };

  const onCreateStructure = () => {
    router.push("/create");
  };

  const hideButton = router.pathname.includes("create");

  const onLogin = () => {
    githubLogin();
  };

  return (
    <Container>
      <Logo onClick={onNavigateToHome}>STRUCTURE BOOK</Logo>
      <RightSection>
        {!user && (
          <Button onClick={onLogin} size={"small"}>
            Github Login
          </Button>
        )}
        {!!user && !hideButton && (
          <Button onClick={onCreateStructure} size="small" isFilled>
            New Structure
          </Button>
        )}

        {/* TODO: empty image 제대로 설정해줘야함 */}
        {!!user && (
          <UserImage>
            <Image
              width={40}
              height={40}
              loader={() => user.photoURL ?? "default image"}
              src={"default image"}
              alt={user.displayName ?? "default image"}
            />
          </UserImage>
        )}
      </RightSection>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  ${({ theme }) => css`
    height: 60px;
    background-color: ${theme.palette.beige3};
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
`;

const Logo = styled.div`
  ${({ theme }) => css`
    height: 60px;
    background-color: ${theme.palette.beige3};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
    color: ${theme.palette.beige6};
    cursor: pointer;
  `}
`;

const RightSection = styled.div`
  ${({ theme }) => css`
    display: flex;
    column-gap: 16px;
  `}
`;

const UserImage = styled.div`
  ${({ theme }) => css`
    width: 40px;
    height: 40px;
    background-color: ${theme.palette.beige2};
    border-radius: 50%;
    overflow: hidden;
  `}
`;
