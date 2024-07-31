import { FC, createContext } from 'react';
import { useLogin as useRaLogin, useNotify } from 'react-admin';
import { LoginDataType } from '@/providers';
import { UseLoginStoreType, useLoginStore } from '../stores';

export type LoginLoadingContextType = UseLoginStoreType & {
  login: (loginData: LoginDataType, errorMessage: string) => Promise<void>;
};

export const LOGIN_LOADING_CONTEXT =
  createContext<LoginLoadingContextType | null>(null);

export const LoginLoadingContext: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { view, setIsLoading, setView, isLoading } = useLoginStore();
  const login = useRaLogin();
  const notify = useNotify();

  const doLogin = async (loginData: LoginDataType, errorMessage: string) => {
    setIsLoading(true);
    login(loginData)
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
