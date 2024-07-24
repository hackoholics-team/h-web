import { AuthProvider } from 'react-admin';
import firebaseAuthProvider, {
  FirebaseSigninType,
} from '@/security/firebase-auth-provider';

export const authProvider: AuthProvider = {
  login: async (_signinData: FirebaseSigninType) => {
    // return firebaseAuthProvider.signIn(signinData);
    return Promise.resolve();
  },
  logout: async () => {
    // return firebaseAuthProvider.signOut();
    return Promise.resolve();
  },
  checkAuth: async () => Promise.reject(),
  // getIdentity: () => Promise.resolve(/* ... */),
  checkError: () => Promise.resolve(/* ... */),
  handleCallback: () => Promise.resolve(/* ... */), // for third-party authentication only
  getPermissions: () => Promise.resolve(/* ... */),
};
