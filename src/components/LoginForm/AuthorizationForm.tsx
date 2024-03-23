import { ChangeEvent, SyntheticEvent, useState } from "react";
import { onAuthorizationFormSubmit } from "@/utilits/onAuthorizationFormSubmit";
import { useAuthenticatorContext } from "@/hooks/AuthenticatorContext";
import {
  StyledForm,
  FormInput,
  StyledLink,
  ApplyButton,
  InputContainer,
  IconContainer,
  ErrorMessage,
  DiagonalLine,
} from "@/components/styled/styled-components";
import { EyeIcon } from "../../../img/EyeIcon";
import styled from "styled-components";

export const AuthorizationForm = () => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    data: { email, password, errorMessage, isLoading },
    operations: { setPassword, setEmail, setErrorMessage, setIsLoading },
  } = useAuthenticatorContext();

  const checkEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    const enteredEmail = e.target.value.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail);
    setShowPasswordInput(isValidEmail);
  };

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await onAuthorizationFormSubmit({
      email,
      password,
      setErrorMessage,
      setIsLoading,
    });
  };

  return (
    <div>
      <StyledForm onSubmit={(e: SyntheticEvent) => onFormSubmit(e)}>
        <FormInput
          type="email"
          id="email"
          name="email"
          placeholder="Work email"
          required
          onChange={(e) => checkEmail(e)}
        />

        {showPasswordInput && (
          <>
            <InputContainer>
              <FormInput
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <IconContainer
                onClick={() => setShowPassword((prevState) => !prevState)}
              >
                {showPassword ? <DiagonalLine /> : null}
                <EyeIcon />
              </IconContainer>
            </InputContainer>
            <StyledLinkContainer>
              <StyledLink href={`/changepassword`}>
                Forgot your password?
              </StyledLink>
              {errorMessage === "" ? null : (
                <ErrorMessage>{errorMessage}</ErrorMessage>
              )}
            </StyledLinkContainer>
          </>
        )}

        <ApplyButton type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Log in to Qencode"}
        </ApplyButton>
      </StyledForm>
    </div>
  );
};

const StyledLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
`;
