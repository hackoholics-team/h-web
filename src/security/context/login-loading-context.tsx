import { FC, createContext, useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { SigninProviderType } from '../firebase-auth-provider';

export type LoginLoadingContextType = {
  login: (provider: SigninProviderType, errorMessage: string) => Promise<void>;
  setIsLoading: (status: boolean) => void;
  isLoading: boolean;
};

export const LOGIN_LOADING_CONTEXT =
  createContext<LoginLoadingContextType | null>(null);

export const LoginLoadingContext: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const login = useLogin();
  const notify = useNotify();

  const doLogin = async (
    provider: SigninProviderType,
    errorMessage: string
  ) => {
    setIsLoading(true);
    login(provider)
      .catch(() => {
        notify(errorMessage, { type: 'error' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <LOGIN_LOADING_CONTEXT.Provider
      value={{
        isLoading,
        login: doLogin,
        setIsLoading: (status) => {
          setIsLoading(status);
        },
      }}
    >
      {children}
    </LOGIN_LOADING_CONTEXT.Provider>
  );
};
