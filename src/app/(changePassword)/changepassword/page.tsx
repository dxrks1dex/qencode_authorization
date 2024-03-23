"use client";
import {
  FormInput,
  ApplyButton,
  SubTitle,
  Button,
  StyledForm,
  ErrorMessage,
  StyledLink,
  SuccessMessage,
} from "@/components/styled/styled-components";
import styled from "styled-components";
import { useAuthenticatorContext } from "@/hooks/AuthenticatorContext";
import { resetPassword } from "@/utilits/authorizationOptions";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

const ChangePasswordForm = () => {
  const [onEmailSend, setOnEmailSend] = useState(false);

  const router = useRouter();

  const {
    data: { email, errorMessage, isLoading },
    operations: { setEmail, setPassword, setErrorMessage, setIsLoading },
  } = useAuthenticatorContext();

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await resetPassword({
      setIsLoading,
      email,
      setErrorMessage,
      setOnEmailSend,
    });
  };

  const onCancelClick = () => {
    setEmail("");
    setPassword("");

    window.history.replaceState(null, "", "/");

    router.back();
  };

  return (
    <div>
      <SubTitle>Forgot Password?</SubTitle>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          onFormSubmit(e);
        }}
      >
        <FormInput
          type="email"
          id="email"
          name="email"
          required
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errorMessage === "" ? null : (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
        {onEmailSend && (
          <SuccessMessage>
            Check email and follow the link in message
          </SuccessMessage>
        )}
        <ApplyButton disabled={isLoading}>
          {isLoading ? "Loading..." : "Send"}
        </ApplyButton>
      </StyledForm>
      <StyledCancelButton disabled={isLoading} onClick={onCancelClick}>
        Cancel
      </StyledCancelButton>
    </div>
  );
};

export default ChangePasswordForm;

const StyledCancelButton = styled(Button)`
  width: 400px;
  height: 48px;

  margin-top: 30px;
`;
