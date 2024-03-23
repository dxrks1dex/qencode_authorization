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

interface IAuthenticatorContext {
  data: {
    email: string;
    password: string;
    errorMessage: string;
    isLoading: boolean;
  };
  operations: {
    setEmail: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
    setErrorMessage: Dispatch<SetStateAction<string>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  };
}

const AuthenticatorContext = createContext<IAuthenticatorContext | null>(null);
export const AuthenticatorContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const context: IAuthenticatorContext = useMemo(
    () => ({
      data: { email, password, errorMessage, isLoading },
      operations: { setEmail, setPassword, setErrorMessage, setIsLoading },
    }),
    [email, errorMessage, isLoading, password],
  );

  return (
    <AuthenticatorContext.Provider value={context}>
      {children}
    </AuthenticatorContext.Provider>
  );
};

export const useAuthenticatorContext = (): IAuthenticatorContext => {
  const value = useContext(AuthenticatorContext);
  if (value === null) {
    throw new Error("empty UseTodoContext");
  }

  return value;
};
