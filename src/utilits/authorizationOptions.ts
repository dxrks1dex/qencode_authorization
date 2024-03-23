import { signIn } from "next-auth/react";
import { API_ROUTE } from "../../API_ROUTE";
import { Dispatch, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface AuthorizationProps {
  email: string;
  password: string;

  setErrorMessage: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

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

interface ResetPasswordProps {
  email: string;

  setErrorMessage: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setOnEmailSend: Dispatch<SetStateAction<boolean>>;
}

export const authorizationOptions = async ({
  email,
  password,
  setErrorMessage,
  setIsLoading,
}: AuthorizationProps) => {
  setIsLoading(true);

  try {
    const userRes = await fetch(`${API_ROUTE}/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!userRes.ok) {
      setErrorMessage("Something went wrong. Please try later");

      throw new Error(userRes.status.toString());
    }

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (result?.error) {
      setErrorMessage("Incorrect email or password");

      throw new Error("incorrect password or email");
    }

    setErrorMessage("");
  } catch (error) {
    setErrorMessage("Incorrect email or password");

    console.error("Failed to sign in:", (error as Error).message);
  } finally {
    setIsLoading(false);
  }
};

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

    router.push(
      "https://65fb1069860b04008db1559c--qencodeloginui.netlify.app/",
    );

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

export const resetPassword = async ({
  email,
  setErrorMessage,
  setIsLoading,
  setOnEmailSend,
}: ResetPasswordProps) => {
  if (!email) {
    console.log("no email");
    setErrorMessage("Enter the email");

    return { error: "Missing email!" };
  }

  setOnEmailSend(false);
  setIsLoading(true);

  try {
    const response = await fetch(`${API_ROUTE}/v1/auth/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${email}`,
      },
      body: JSON.stringify({
        email: email,
        url: `https://65fb1069860b04008db1559c--qencodeloginui.netlify.app/confirm-new-password`,
      }),
    });

    if (!response.ok) {
      setErrorMessage("Something went wrong. Please try later");

      throw new Error(response.status.toString());
    }

    setOnEmailSend(true);
    setErrorMessage("");

    return response;
  } catch (error: any) {
    if (error.message === "429") {
      setErrorMessage("Too many requests. Please try again later.");
    } else {
      setErrorMessage("Failed to connect email. Please try later.");
    }

    console.error("Failed to connect email:", error.message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};
