"use client";
import { AuthorizationForm } from "@/components/LoginForm/AuthorizationForm";
import {
  StyledButtons,
  StyledLink,
  StyledSubTitle,
} from "@/components/styled/styled-components";
import { signIn, signOut, useSession } from "next-auth/react";
import googleLogo from "../../img/google.svg";
import github from "../../img/github.svg";
import styled from "styled-components";
import Image from "next/image";

export const Login = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div>
        <p>{session.user.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <StyledSubTitle>Log in to your account</StyledSubTitle>
      <StyledButtonContainer>
        <StyledLinkButtons
          onClick={() => signIn("google", { redirect: false })}
        >
          <StyledIcon src={googleLogo} alt="Google Logo" />
          Google
        </StyledLinkButtons>
        <StyledLinkButtons
          onClick={() => signIn("github", { redirect: false })}
        >
          <StyledIcon src={github} alt="Git Logo" />
          GitHub
        </StyledLinkButtons>
      </StyledButtonContainer>
      <StyledDiver>
        <HorizontalLine />
        or
        <HorizontalLine />
      </StyledDiver>
      <AuthorizationForm />
      <StyledText>
        Is your company new to Qencode?
        <StyledLink href={"https://cloud.qencode.com/"}> Sign up</StyledLink>
      </StyledText>
    </div>
  );
};

const StyledLinkButtons = styled(StyledButtons)`
  width: 192px;
  height: 48px;

  font-weight: 550;
`;

const StyledButtonContainer = styled.section`
  display: flex;
  justify-content: space-between;

  width: 400px;

  height: 48px;

  border-radius: 6px;

  margin-bottom: 30px;
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
  top: 448px;
  left: 556px;
  border: 1px;

  cursor: default;
  user-select: none;
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
`;

const StyledText = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.20000000298023224px;
  text-align: center;

  margin-top: 10px;
`;
