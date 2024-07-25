import { FC, createContext, useState } from 'react';
import { useLogin as useRaLogin, useNotify } from 'react-admin';
import { SigninProviderType } from '../firebase-auth-provider';

export type LoginViewType = 'signin' | 'signup';

export type LoginLoadingContextType = {
  view: LoginViewType;
  isSignin: boolean;
  isLoading: boolean;
  login: (provider: SigninProviderType, errorMessage: string) => Promise<void>;
  setLoginView: (view: LoginViewType) => void;
  setIsLoading: (status: boolean) => void;
};

export const LOGIN_LOADING_CONTEXT =
  createContext<LoginLoadingContextType | null>(null);

export const LoginLoadingContext: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<LoginViewType>('signin');
  const login = useRaLogin();
  const notify = useNotify();

  const isSignin = view == 'signin';

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
        isSignin,
        isLoading,
        login: doLogin,
        setIsLoading: (status) => {
          setIsLoading(status);
        },
        setLoginView: (viewValue) => {
          setView(viewValue);
        },
      }}
    >
      {children}
    </LOGIN_LOADING_CONTEXT.Provider>
  );
};
