import React from "react";
import Button from "./Button";
import Image from "next/image";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import userStore from "@/store/userStore";
import useLogin from "@/hooks/useLogin";
import Avatar from "./Avatar";
import SVG from "./SVG";

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
      <Logo onClick={onNavigateToHome}>
        <SVG name="logo" />
        STRUCTURE BOOK
      </Logo>
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
        {!!user?.photoURL && <Avatar src={user.photoURL} />}
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
    column-gap: 8px;
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
