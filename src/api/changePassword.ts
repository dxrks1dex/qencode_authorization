import { API_ROUTE } from "../../API_ROUTE";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";

interface ChangePasswordProps {
  token: string | null;
  newPassword: string;
  checkNewPassword: string;
  secret: string | null;

  router: AppRouterInstance;

  setErrorMessage: Dispatch<SetStateAction<string>>;
  setChangeSuccess: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const changePassword = async ({
  token,
  secret,
  newPassword,
  checkNewPassword,
  setErrorMessage,
  setChangeSuccess,
  router,
  setIsLoading,
}: ChangePasswordProps) => {
  if (token === null) {
    console.log("no token");
    setErrorMessage("Something went wrong. Please try to re-request the link");
    return { error: "Missing token!" };
  }

  if (secret === null) {
    console.log("no secret");
    setErrorMessage("Something went wrong. Please try to re-request the link");
    return { error: "Missing secret!" };
  }

  setIsLoading(true);

  try {
    const response = await fetch(`${API_ROUTE}/v1/auth/password-set`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        secret: secret,
        token: token,
        password: newPassword,
        password_confirm: checkNewPassword,
      }),
    });

    if (!response.ok) {
      setErrorMessage("Something went wrong. Please try later");

      throw new Error(response.status.toString());
    }

    setChangeSuccess(true);
    setErrorMessage("");

    router.push("https://main--qencodeloginui.netlify.app/changepassword");

    return response;
  } catch (error: any) {
    if (error.message === "429") {
      setErrorMessage("Too many requests. Please try again later.");
    } else {
      setErrorMessage("Account doesn't exist");
    }

    console.error("Failed to change password:", error.message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};
