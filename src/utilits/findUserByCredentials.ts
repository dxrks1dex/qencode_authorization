import { defaultCredentials } from "@/data/userData";

interface PropsFindUserByCredentials {
  email: string;
  password: string;
}

interface PropsFindUserByEmail {
  email: string;
}

export const findUserByCredentials = ({
  body,
}: {
  body: PropsFindUserByCredentials;
}) => {
  return Object.values(defaultCredentials).find(
    (user) => user.email === body.email && user.password === body.password,
  );
};

export const findUserByEmail = ({ body }: { body: PropsFindUserByEmail }) => {
  return !!Object.values(defaultCredentials).find(
    (user) => user.email === body.email,
  );
};

export const getUserDataByEmail = (email: string) => {
  const user = Object.values(defaultCredentials).find(
    (user) => user.email === email,
  );

  if (user) {
    return { token: user?.token, secret: user?.secret };
  }

  return null;
};

export const findUserPassword = (password: string) => {
  return !!Object.values(defaultCredentials).find(
    (user) => user.password === password,
  );
};
