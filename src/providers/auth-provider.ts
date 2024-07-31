import { AuthProvider } from 'react-admin';
import {
  firebaseAuthProvider,
  SigninProviderType,
} from './firebase-auth-provider';

export const authProvider: AuthProvider = {
  login: async (provider: SigninProviderType) => {
    return firebaseAuthProvider.signIn(provider);
  },
  logout: async () => {
    return firebaseAuthProvider.signOut();
  },
  checkAuth: async () => Promise.reject(),
  // getIdentity: () => Promise.resolve(/* ... */),
  checkError: () => Promise.resolve(/* ... */),
  handleCallback: () => Promise.resolve(/* ... */), // for third-party authentication only
  getPermissions: () => Promise.resolve(/* ... */),
};
