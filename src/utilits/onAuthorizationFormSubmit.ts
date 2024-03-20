import { Dispatch, SetStateAction } from "react";
import { authorization } from "@/utilits/authorization";

interface Props {
  password: string;
  email: string;
  setError: Dispatch<SetStateAction<string>>;
}

export const onAuthorizationFormSubmit = ({
  setError,
  email,
  password,
}: Props) => {
  if (password.length < 5) {
    setError("Password is too short");
    return;
  }

  setError("");
  authorization({ email, password });
};
