import { signIn } from "next-auth/react";
import { mockApiRequest } from "@/utilits/mock";

interface AuthorizationProps {
  email: string;
  password: string;
}

interface ChangePasswordProps {
  token: string | null;
  newPassword: string;
  secret: string | null;
}

interface ResetPasswordProps {
  email: string;
}

export const authorizationOptions = async ({
  email,
  password,
}: AuthorizationProps) => {
  try {
    const userRes = await mockApiRequest("/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (userRes.error) {
      throw new Error(String(userRes.error));
    }

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    if (result?.error) {
      throw new Error("incorrect password");
    }
  } catch (error) {
    console.error("Failed to sign in:", (error as Error).message);
  }
};

export const changePassword = async ({
  token,
  secret,
  newPassword,
}: ChangePasswordProps) => {
  if (!token) {
    console.log("no token");
    return { error: "Missing token!" };
  }

  if (!secret) {
    console.log("no secret");
    return { error: "Missing secret!" };
  }

  try {
    const response = await mockApiRequest("v1/auth/password-set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        secret: secret,
        token: token,
        newPassword: newPassword,
      }),
    });

    if (response.error) {
      throw new Error(response.error.toString());
    }

    return response;
  } catch (error: any) {
    console.error("Failed to change password:", error.message);
    throw error;
  }
};

export const resetPassword = async ({ email }: ResetPasswordProps) => {
  if (!email) {
    console.log("no email");
    return { error: "Missing email!" };
  }

  try {
    const response = await mockApiRequest("/v1/auth/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${email}`,
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    if (response.error) {
      throw new Error(response.error.toString());
    }

    return response;
  } catch (error: any) {
    console.error("Failed to connect email:", error.message);
    throw error;
  }
};
