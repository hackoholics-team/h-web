import { AuthProvider } from 'react-admin';
import {
  SigninProviderType,
  firebaseAuthProvider,
} from './firebase-auth-provider';

export type LoginDataType = {
  provider: SigninProviderType;
  type: 'signin' | 'signup';
};

export const authProvider: AuthProvider = {
  login: async (loginDataType: LoginDataType) => {
    if (loginDataType.type === 'signup') {
      return firebaseAuthProvider.signup(loginDataType.provider);
    }
    return firebaseAuthProvider.signIn(loginDataType.provider);
  },
  logout: async () => {
    return firebaseAuthProvider.signOut();
  },
  checkAuth: async () => Promise.resolve(),
  // getIdentity: () => Promise.resolve(/* ... */),
  checkError: () => Promise.resolve(/* ... */),
  handleCallback: () => Promise.resolve(/* ... */), // for third-party authentication only
  getPermissions: () => Promise.resolve(/* ... */),
};
