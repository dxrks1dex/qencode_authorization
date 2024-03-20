import { Dispatch, FormEvent, SetStateAction } from "react";
import { findUserPassword } from "@/utilits/findUserByCredentials";
import { changePassword, resetPassword } from "@/utilits/authorizationOptions";

interface Props {
  e: FormEvent;
  password: string;
  checkNewPassword: string;
  token: string | null;
  secret: string | null;
  email: string;

  setError: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setCheckNewPassword: Dispatch<SetStateAction<string>>;
}

export const onFormSubmit = async ({
  e,
  setCheckNewPassword,
  checkNewPassword,
  setPassword,
  password,
  setError,
  token,
  secret,
  email,
}: Props) => {
  e.preventDefault();

  if (password.length < 5) {
    setError("Passwords is to short");
    return;
  }

  if (password.length > 512) {
    return { error: "New password is too long!" };
  }

  if (password.includes(" ")) {
    setError("Uncorrected password");
    return;
  }

  if (findUserPassword(password)) {
    setError("password is equal to the current");
    return;
  }

  if (password !== checkNewPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    await resetPassword({ email });
    await changePassword({ secret, token, newPassword: password });

    setPassword("");
    setCheckNewPassword("");
    setError("");
  } catch (error: any) {
    setError(error.message);
  }
};
