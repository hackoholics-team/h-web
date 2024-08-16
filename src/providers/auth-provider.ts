import { AuthProvider } from 'react-admin';
import { AxiosError } from 'axios';
import {
  SigninProviderType,
  firebaseAuthProvider,
} from './firebase-auth-provider';
import { securityApi } from './api';
import { saveConnectedId } from '@/common/hooks';

export type LoginDataType = {
  provider: SigninProviderType;
  type: 'signin' | 'signup';
};

const COMPLETE_INFO_URL = '#/register';
const TO_SIGNOUT_STATUS_CODES = [403, 401];
export const authProvider: AuthProvider = {
  login: async (loginData: LoginDataType) => {
    if (loginData.type === 'signup') {
      return firebaseAuthProvider.signup(loginData.provider);
    }
    return firebaseAuthProvider.signIn(loginData.provider);
  },
  logout: async () => {
    await firebaseAuthProvider.signOut();
    window.location.href = '#/login';
    return Promise.resolve();
  },
  checkAuth: async () => {
    const credentials = firebaseAuthProvider.getCachedCredential();
    const isCompeltedUser = await securityApi()
      .isSignupStillProcessed({
        uid: credentials.id!,
        email: credentials.email!,
      })
      .then((response) => response.data);

    try {
      const { id } = await securityApi()
        .signIn()
        .then((response) => response.data);
      saveConnectedId(id!);
      return Promise.resolve();
    } catch {
      if (
        !isCompeltedUser &&
        credentials.token &&
        credentials.email &&
        credentials.id
      ) {
        window.location.href = COMPLETE_INFO_URL;
        return Promise.resolve();
      }
    }
    return Promise.reject();
  },
  checkError: async (error) => {
    if (!(error instanceof AxiosError)) {
      return Promise.resolve();
    }
    if (TO_SIGNOUT_STATUS_CODES.includes(error.status!)) {
      firebaseAuthProvider.signOut();
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // getIdentity: () => Promise.resolve(/* ... */),
  handleCallback: () => Promise.resolve(/* ... */), // for third-party authentication only
  getPermissions: () => Promise.resolve(/* ... */),
};
