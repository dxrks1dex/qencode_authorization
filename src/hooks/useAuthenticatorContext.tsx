import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { bold } from "next/dist/lib/picocolors";

interface IAuthenticatorContext {
  data: {
    email: string;
    password: string;
  };
  operations: {
    setEmail: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
  };
}

const UseAuthenticatorContext = createContext<IAuthenticatorContext | null>(
  null,
);
export const AuthenticatorContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context: IAuthenticatorContext = useMemo(
    () => ({
      data: { email, password },
      operations: { setEmail, setPassword },
    }),
    [email, password],
  );

  return (
    <UseAuthenticatorContext.Provider value={context}>
      {children}
    </UseAuthenticatorContext.Provider>
  );
};

export const useAuthenticatorContext = (): IAuthenticatorContext => {
  const value = useContext(UseAuthenticatorContext);
  if (value === null) {
    throw new Error("empty UseTodoContext");
  }

  return value;
};
