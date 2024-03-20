"use client";
import {
  StyledApplyButton,
  StyledForm,
  StyledInput,
  StyledPasswordInputContainer,
  StyledShowPasswordIconContainer,
  StyledSubTitle,
} from "@/components/styled/styled-components";
import { useRef, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";
import { onFormSubmit } from "@/utilits/onChangePasswordFormSubmit";
import { EyeIcon } from "../../../../img/EyeIcon";
import { onShowPassword } from "@/utilits/onShowPassword";
import { useAuthenticatorContext } from "@/hooks/useAuthenticatorContext";

const ConfirmNewPassword = () => {
  const [password, setPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmNewPassword: false,
  });

  const {
    data: { email },
  } = useAuthenticatorContext();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const secret = searchParams.get("secret");

  return (
    <div>
      <StyledSubTitle>Create new Password?</StyledSubTitle>
      <StyledForm
        onSubmit={(e) =>
          onFormSubmit({
            e,
            password,
            setPassword,
            setCheckNewPassword,
            checkNewPassword,
            secret,
            setError,
            token,
            email,
          })
        }
      >
        <div>
          <StyledInputName>Password</StyledInputName>
          <StyledPasswordInputContainer>
            <StyledInput
              type={showPassword.newPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <StyledShowPasswordIconContainer
              onClick={() =>
                onShowPassword({ field: "newPassword", setShowPassword })
              }
            >
              <EyeIcon />
            </StyledShowPasswordIconContainer>
          </StyledPasswordInputContainer>
        </div>
        <div>
          <StyledInputName>Confirm Password</StyledInputName>
          <StyledPasswordInputContainer>
            <StyledInput
              type={showPassword.confirmNewPassword ? "text" : "password"}
              id="confirmNewPassword"
              name="confirmNewPassword"
              required
              placeholder="Confirm Password"
              value={checkNewPassword}
              onChange={(e) => setCheckNewPassword(e.target.value)}
            />
            <StyledShowPasswordIconContainer
              onClick={() =>
                onShowPassword({ field: "confirmNewPassword", setShowPassword })
              }
            >
              <EyeIcon />
            </StyledShowPasswordIconContainer>
          </StyledPasswordInputContainer>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <StyledApplyButton type="submit">Reset Password</StyledApplyButton>
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;
