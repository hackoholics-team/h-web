import { FC, createContext } from 'react';
import { useLogin as useRaLogin, useNotify } from 'react-admin';
import { SigninProviderType } from '../firebase-auth-provider';
import { useLoginStore, UseLoginStoreType } from '../stores';

export type LoginLoadingContextType = UseLoginStoreType & {
  login: (provider: SigninProviderType, errorMessage: string) => Promise<void>;
};

export const LOGIN_LOADING_CONTEXT =
  createContext<LoginLoadingContextType | null>(null);

export const LoginLoadingContext: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { view, setIsLoading, setView, isLoading } = useLoginStore();
  const login = useRaLogin();
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
        view,
        isLoading,
        setView,
        setIsLoading,
        login: doLogin,
      }}
    >
      {children}
    </LOGIN_LOADING_CONTEXT.Provider>
  );
};
