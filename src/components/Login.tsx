"use client";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import {
  Button,
  StyledLink,
  SubTitle,
} from "@/components/styled/styled-components";
import { signIn, signOut, useSession } from "next-auth/react";
import googleLogo from "../../img/google.svg";
import github from "../../img/github.svg";
import styled from "styled-components";
import Image from "next/image";
import { size } from "@/components/styled/sizes";

export const Login = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    console.log(session.user.email);
    return (
      <div>
        <p>Email: {session.user.email}</p>
        <StyledLinkButton onClick={() => signOut()}>Sign Out</StyledLinkButton>
      </div>
    );
  }

  return (
    <div>
      <SubTitle>Log in to your account</SubTitle>
      <StyledButtonContainer>
        <StyledLinkButton onClick={() => signIn("google", { redirect: false })}>
          <StyledIcon src={googleLogo} alt="Google Logo" />
          Google
        </StyledLinkButton>
        <StyledLinkButton onClick={() => signIn("github", { redirect: false })}>
          <StyledIcon src={github} alt="Git Logo" />
          GitHub
        </StyledLinkButton>
      </StyledButtonContainer>
      <StyledDiver>
        <HorizontalLine />
        or
        <HorizontalLine />
      </StyledDiver>
      <LoginForm />
      <StyledText>
        Is your company new to Qencode?
        <StyledLink href={"https://cloud.qencode.com/"}> Sign up</StyledLink>
      </StyledText>
    </div>
  );
};

const StyledLinkButton = styled(Button)`
  width: 192px;
  height: 48px;

  font-weight: 550;

  @media (max-width: ${size.mobile}) {
    width: 91%;

    height: 48px;
  }
`;

const StyledButtonContainer = styled.section`
  display: flex;
  justify-content: space-between;

  width: 400px;

  height: 48px;

  border-radius: 6px;

  margin-bottom: 30px;

  @media (max-width: ${size.mobile}) {
    flex-direction: column;

    align-items: center;

    width: 100%;
    height: 106px;
  }
`;

const StyledIcon = styled(Image)`
  display: flex;
  justify-content: space-between;

  width: 18px;
  height: 18px;
`;

const StyledDiver = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  color: #e3e6e9;

  width: 400px;
  height: 16px;

  border: 1px;

  cursor: default;
  user-select: none;

  @media (max-width: ${size.mobile}) {
    width: 90%;
    margin-left: 5%;
    margin-bottom: 7.5%;
  }
`;

const HorizontalLine = styled.div`
  width: 186px;

  border-top: 1px solid #e3e6e9;

  font-family:
    Basis Grotesque Pro,
    serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: left;

  @media (max-width: ${size.mobile}) {
    width: 40%;
  }
`;

const StyledText = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.20000000298023224px;
  text-align: center;

  margin-top: 10px;
`;
