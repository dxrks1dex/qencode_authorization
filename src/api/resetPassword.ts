import { API_ROUTE } from "../../API_ROUTE";
import { Dispatch, SetStateAction } from "react";

interface ResetPasswordProps {
  email: string;

  setErrorMessage: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsEmailSent: Dispatch<SetStateAction<boolean>>;
}

export const resetPassword = async ({
  email,
  setErrorMessage,
  setIsLoading,
  setIsEmailSent,
}: ResetPasswordProps) => {
  if (!email) {
    console.log("no email");
    setErrorMessage("Enter the email");

    return { error: "Missing email!" };
  }

  setIsEmailSent(false);
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
        url: `https://main--qencodeloginui.netlify.app/confirm-new-password`,
      }),
    });

    if (!response.ok) {
      setErrorMessage("Something went wrong. Please try later");

      throw new Error(response.status.toString());
    }

    setIsEmailSent(true);
    setErrorMessage("");

    return response;
  } catch (error: any) {
    if (error.message === "429") {
      setErrorMessage("Too many requests. Please try again later.");
    } else if (error.message === "401") {
      setErrorMessage("Email doesn't exist.");
    } else {
      setErrorMessage("Failed to connect email. Please try later.");
    }

    console.error("Failed to connect email:", error.message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};
