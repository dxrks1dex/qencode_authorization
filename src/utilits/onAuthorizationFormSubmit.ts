import { Dispatch, SetStateAction } from "react";
import { authorizationOptions } from "@/utilits/authorizationOptions";

interface Props {
  password: string;
  email: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const onAuthorizationFormSubmit = ({
  setErrorMessage,
  email,
  password,
  setIsLoading,
}: Props) => {
  if (password.length < 5) {
    setErrorMessage("Password is too short");
    return;
  }

  setErrorMessage("");
  authorizationOptions({ email, password, setErrorMessage, setIsLoading });
};
