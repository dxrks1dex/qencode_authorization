"use client";
import {
  StyledInput,
  StyledApplyButton,
  StyledSubTitle,
  StyledButtons,
  StyledForm,
} from "@/components/styled/styled-components";
import styled from "styled-components";
import Link from "next/link";
import { useAuthenticatorContext } from "@/hooks/useAuthenticatorContext";
import {
  findUserByEmail,
  getUserDataByEmail,
} from "@/utilits/findUserByCredentials";
import { useRouter } from "next/navigation";

const ChangePasswordForm = () => {
  const {
    data: { email },
    operations: { setEmail },
  } = useAuthenticatorContext();

  const router = useRouter();

  const onPasswordChangeRequest = () => {
    if (findUserByEmail({ body: { email } })) {
      router.push(
        `/confirm-new-password?token=${getUserDataByEmail(email)?.token}&secret=${getUserDataByEmail(email)?.secret}`,
      );
    } else {
      console.log("email not found");
    }
  };

  return (
    <div>
      <StyledSubTitle>Forgot Password?</StyledSubTitle>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          onPasswordChangeRequest();
        }}
      >
        <StyledInput
          type="email"
          id="email"
          name="email"
          required
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledApplyButton>Send</StyledApplyButton>
      </StyledForm>
      <Link href="/">
        <StyledCancelButton>Cancel</StyledCancelButton>
      </Link>
    </div>
  );
};

export default ChangePasswordForm;

const StyledCancelButton = styled(StyledButtons)`
  width: 400px;
  height: 48px;

  margin-top: 30px;
`;
