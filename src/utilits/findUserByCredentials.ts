import { API_ROUTE } from "../../API_ROUTE";

interface User {
  email: string;
  password: string;
  token: string;
  secret: string;
}

export const findUserByCredentials = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User | null> => {
  try {
    const response = await fetch(`${API_ROUTE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to find user by credentials");
    }

    return response.json();
  } catch (error) {
    console.error("Error finding user by credentials:", error);
    return null;
  }
};

export const findUserByEmail = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_ROUTE}/auth/user-exists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to find user by email");
    }

    return response.json(); // Возвращаем булево значение
  } catch (error) {
    console.error("Error finding user by email:", error);
    return false;
  }
};

export const getUserDataByEmail = async (
  email: string,
): Promise<User | null> => {
  try {
    const response = await fetch(`${API_ROUTE}/auth/user-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to get user data by email");
    }

    return response.json();
  } catch (error) {
    console.error("Error getting user data by email:", error);
    return null;
  }
};

export const findUserPassword = async (password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_ROUTE}/auth/password-exists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      throw new Error("Failed to find user by password");
    }

    return response.json(); // Возвращаем булево значение
  } catch (error) {
    console.error("Error finding user by password:", error);
    return false;
  }
};

//for mock tests
// import { defaultCredentials } from "@/mockForTests/testDataForMock/userData";
//
// interface PropsFindUserByCredentials {
//   email: string;
//   password: string;
// }
//
// interface PropsFindUserByEmail {
//   email: string;
// }
//
// export const findUserByCredentials = ({
//   body,
// }: {
//   body: PropsFindUserByCredentials;
// }) => {
//   return Object.values(defaultCredentials).find(
//     (user) => user.email === body.email && user.password === body.password,
//   );
// };
//
// export const findUserByEmail = ({ body }: { body: PropsFindUserByEmail }) => {
//   return !!Object.values(defaultCredentials).find(
//     (user) => user.email === body.email,
//   );
// };
//
// export const getUserDataByEmail = (email: string) => {
//   const user = Object.values(defaultCredentials).find(
//     (user) => user.email === email,
//   );
//
//   if (user) {
//     return { token: user?.token, secret: user?.secret };
//   }
//
//   return null;
// };
//
// export const findUserPassword = (password: string) => {
//   return !!Object.values(defaultCredentials).find(
//     (user) => user.password === password,
//   );
// };
