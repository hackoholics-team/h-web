import { AuthProvider } from 'react-admin';
import { AxiosError } from 'axios';
import {
  SigninProviderType,
  firebaseAuthProvider,
} from './firebase-auth-provider';
// import { securityApi } from './api';
// import { NOOP_FN } from '@/common/utils/noop';

export type LoginDataType = {
  provider: SigninProviderType;
  type: 'signin' | 'signup';
};

// const COMPLETE_INFO_URL = '#/login';
// const REDIRECTION_STATUS_CODE = 102;
// const TO_SIGNOUT_STATUS_CODES = [403, 401];

export const authProvider: AuthProvider = {
  login: async (loginData: LoginDataType) => {
    if (loginData.type === 'signup') {
      return firebaseAuthProvider.signup(loginData.provider);
    }
    return firebaseAuthProvider.signIn(loginData.provider);
  },
  logout: async () => {
    await firebaseAuthProvider.signOut();
    window.location.reload();
    return Promise.resolve();
  },
  checkAuth: async () => {
    // return securityApi().signIn().then(NOOP_FN).catch((error) => {
    // if (error instanceof AxiosError) {
    //   if (error.status === REDIRECTION_STATUS_CODE) {
    //     window.location.href = COMPLETE_INFO_URL;
    //     window.location.reload();
    //     return Promise.resolve();
    //   }
    // }
    return Promise.resolve(); // change to reject after fix;
    // })
  },
  checkError: async (error) => {
    if (!(error instanceof AxiosError)) {
      return Promise.resolve();
    }
    // if (TO_SIGNOUT_STATUS_CODES.includes(error.status!)) {
    //   firebaseAuthProvider.signOut();
    //   return Promise.reject();
    // }
    return Promise.resolve();
  },
  // getIdentity: () => Promise.resolve(/* ... */),
  handleCallback: () => Promise.resolve(/* ... */), // for third-party authentication only
  getPermissions: () => Promise.resolve(/* ... */),
};
