import { ChangeEvent, SyntheticEvent, useState } from "react";
import { onAuthorizationFormSubmit } from "@/utilits/onAuthorizationFormSubmit";
import { useAuthenticatorContext } from "@/hooks/useAuthenticatorContext";
import {
  StyledForm,
  StyledInput,
  StyledLink,
  StyledApplyButton,
  StyledPasswordInputContainer,
  StyledShowPasswordIconContainer,
} from "@/components/styled/styled-components";
import { EyeIcon } from "../../../img/EyeIcon";

export const AuthorizationForm = () => {
  const [error, setError] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    data: { email, password },
    operations: { setPassword, setEmail },
  } = useAuthenticatorContext();

  const checkEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    const enteredEmail = e.target.value.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail);
    setShowPasswordInput(isValidEmail);
  };

  return (
    <div>
      <StyledForm
        onSubmit={(e: SyntheticEvent) => {
          e.preventDefault();
          onAuthorizationFormSubmit({ email, password, setError });
        }}
      >
        <StyledInput
          type="email"
          id="email"
          name="email"
          placeholder="Work email"
          required
          onChange={(e) => checkEmail(e)}
        />

        {showPasswordInput && (
          <>
            <StyledPasswordInputContainer>
              <StyledInput
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <StyledShowPasswordIconContainer
                onClick={() => setShowPassword((prevState) => !prevState)}
              >
                <EyeIcon />
              </StyledShowPasswordIconContainer>
            </StyledPasswordInputContainer>

            <StyledLink href={`/changepassword`}>
              Forgot your password?
            </StyledLink>
          </>
        )}
        {error && <p>{error}</p>}
        <StyledApplyButton type="submit">Log in to Qencode</StyledApplyButton>
      </StyledForm>
    </div>
  );
};
