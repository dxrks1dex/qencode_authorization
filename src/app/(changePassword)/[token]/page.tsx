"use client";
import {
  ApplyButton,
  StyledForm,
  FormInput,
  InputContainer,
  IconContainer,
  SubTitle,
  ErrorMessage,
  SuccessMessage,
  DiagonalLine,
} from "@/components/styled/styled-components";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import { onChangePassword } from "@/utilits/onChangePasswordFormSubmit";
import { EyeIcon } from "../../../../img/EyeIcon";
import { useAuthenticatorContext } from "@/hooks/AuthenticatorContext";

interface onShowPasswordProps {
  field: "newPassword" | "confirmNewPassword";
  setShowPassword: Dispatch<
    SetStateAction<{ newPassword: boolean; confirmNewPassword: boolean }>
  >;
}

const ConfirmNewPassword = () => {
  const [password, setPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isChangedPasswordVisible, setIsChangedPasswordVisible] =
    useState(false);
  const [changeSuccess, setChangeSuccess] = useState(false);

  const router = useRouter();

  const {
    data: { errorMessage, isLoading },
    operations: { setErrorMessage, setIsLoading },
  } = useAuthenticatorContext();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const secret = searchParams.get("secret");

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await onChangePassword({
      e,
      password: password,
      checkNewPassword,
      secret,
      setErrorMessage,
      token,
      setChangeSuccess,
      router,
      setIsLoading,
    });
  };

  return (
    <div>
      <SubTitle>Create new Password?</SubTitle>
      <StyledForm onSubmit={(e) => onFormSubmit(e)}>
        <div>
          <StyledInputName>Password</StyledInputName>
          <InputContainer>
            <FormInput
              disabled={isLoading}
              type={isPasswordVisible ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <IconContainer
              onClick={() => setIsPasswordVisible((prevState) => !prevState)}
            >
              {isPasswordVisible ? <DiagonalLine /> : null}
              <EyeIcon />
            </IconContainer>
          </InputContainer>
        </div>
        <div>
          <StyledInputName>Confirm Password</StyledInputName>
          <InputContainer>
            <FormInput
              disabled={isLoading}
              type={isChangedPasswordVisible ? "text" : "password"}
              id="confirmNewPassword"
              name="confirmNewPassword"
              required
              placeholder="Confirm Password"
              value={checkNewPassword}
              onChange={(e) => setCheckNewPassword(e.target.value)}
            />
            <IconContainer
              onClick={() =>
                setIsChangedPasswordVisible((prevState) => !prevState)
              }
            >
              {isChangedPasswordVisible ? <DiagonalLine /> : null}
              <EyeIcon />
            </IconContainer>
          </InputContainer>
        </div>
        {errorMessage === "" ? null : (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
        {changeSuccess && <SuccessMessage>Password changed</SuccessMessage>}
        <ApplyButton type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Reset Password"}
        </ApplyButton>
      </StyledForm>
    </div>
  );
};

export default ConfirmNewPassword;

const StyledInputName = styled.span`
  color: #060e1e;
  font-size: 15px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.0024em;
  text-align: left;
`;
