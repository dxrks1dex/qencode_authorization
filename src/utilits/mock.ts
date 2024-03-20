import { findUserByCredentials } from "@/utilits/findUserByCredentials";
import { defaultCredentials } from "@/data/userData";

interface MockApiRequestData {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization?: string;
  };
  body: string;
}

export async function mockApiRequest(
  endpoint: string,
  data: MockApiRequestData,
) {
  switch (endpoint) {
    case "/v1/auth/login":
      const body = JSON.parse(data.body);

      const user = findUserByCredentials({ body });

      if (!user) {
        return { error: "Invalid email or password" };
      } else {
        return {
          error: 0,
          detail: "Login successful",
          access_token: "mock_access_token",
          refresh_token: "mock_refresh_token",
          token_expire: Date.now() + 3600 * 1000,
          refresh_token_expire: Date.now() + 24 * 3600 * 1000,
        };
      }
    case "/v1/auth/access-token":
      return { status: 200 };
    case "/v1/auth/password-reset":
      return {
        error: 0,
        detail:
          "Please check your email to complete the password reset process.",
      };
    case "/v1/auth/change-password":
      const changePasswordData = JSON.parse(data.body);
      const userToken = changePasswordData.token;
      const newPassword = changePasswordData.newPassword;

      const userToUpdate = Object.values(defaultCredentials).find(
        (user) => user.token === userToken,
      );

      if (!userToUpdate) {
        return { error: "User not found" };
      } else {
        userToUpdate.password = newPassword;

        return {
          error: 0,
          detail: "Password changed successfully",
        };
      }
    default:
      throw new Error("Unknown endpoint");
  }
}
