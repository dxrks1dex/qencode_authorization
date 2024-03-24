import { Dispatch, FormEvent, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { changePassword } from "@/api/changePassword";

interface Props {
  e: FormEvent;
  password: string;
  checkNewPassword: string;
  token: string | null;
  secret: string | null;

  router: AppRouterInstance;

  setErrorMessage: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setChangeSuccess: Dispatch<SetStateAction<boolean>>;
}

export const onChangePassword = async ({
  e,
  checkNewPassword,
  password,
  setErrorMessage,
  token,
  secret,
  setChangeSuccess,
  router,
  setIsLoading,
}: Props) => {
  e.preventDefault();

  if (password.length < 5) {
    setErrorMessage("Passwords is to short");
    return;
  }

  if (password.length > 512) {
    return { error: "New password is too long!" };
  }

  if (password !== checkNewPassword) {
    setErrorMessage("Passwords do not match");
    return;
  }

  try {
    await changePassword({
      secret,
      token,
      newPassword: password,
      checkNewPassword,
      setErrorMessage,
      setChangeSuccess,
      router,
      setIsLoading,
    });
  } catch (error: any) {
    setErrorMessage(error.message);
  }
};
