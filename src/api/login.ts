import { API_ROUTE } from "../../API_ROUTE";
import { signIn } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

interface AuthorizationProps {
  email: string;
  password: string;

  setErrorMessage: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const login = async ({
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
