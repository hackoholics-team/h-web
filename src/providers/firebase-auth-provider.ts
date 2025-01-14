import {
  GoogleAuthProvider,
  UserCredential,
  signOut as firebaseSignOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { FIREBASE_AUTH } from '@/config/firebase-config';

export type SigninProviderType =
  | {
      email: string;
      password: string;
    }
  | { new (): GoogleAuthProvider };

const USER_ID_CACHE_NAME = 'auth-user-id';
const TOKEN_ID_CACHE_NAME = 'auth-token-id';
const USER_EMAIL_CACHE_NAME = 'auth-user-email';

const getCachedCredential = () => ({
  token: localStorage.getItem(TOKEN_ID_CACHE_NAME),
  id: localStorage.getItem(USER_ID_CACHE_NAME),
  email: localStorage.getItem(USER_EMAIL_CACHE_NAME),
});

const cacheCredential = async (credential: UserCredential) => {
  const user = credential?.user;
  if (!user) return credential;
  localStorage.setItem(TOKEN_ID_CACHE_NAME, await user.getIdToken());
  localStorage.setItem(USER_ID_CACHE_NAME, user.uid);
  localStorage.setItem(USER_EMAIL_CACHE_NAME, user.email!);
  return credential;
};

const signIn = async (provider: SigninProviderType) => {
  if ('password' in provider) {
    const { email, password } = provider;
    return cacheCredential(
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
    );
  }
  return cacheCredential(await signInWithPopup(FIREBASE_AUTH, new provider()));
};

const signup = async (provider: SigninProviderType) => {
  if ('password' in provider) {
    const { email, password } = provider;
    return cacheCredential(
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    );
  }
  return cacheCredential(await signIn(provider));
};

const signOut = async () => {
  await firebaseSignOut(FIREBASE_AUTH);
  const currentTheme = localStorage.getItem('RaStore.theme');
  localStorage.clear();
  localStorage.setItem('RaStore.theme', currentTheme || 'dark');
};

const resetPassword = async (email: string) => {
  return sendPasswordResetEmail(FIREBASE_AUTH, email);
};

export const firebaseAuthProvider = {
  signIn,
  signOut,
  signup,
  resetPassword,
  cacheCredential,
  getCachedCredential,
};
