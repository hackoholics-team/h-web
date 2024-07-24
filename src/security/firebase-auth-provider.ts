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

export type FirebaseSigninType =
  | {
      email: string;
      password: string;
    }
  | { new (): GoogleAuthProvider };

const TOKEN_ID_CACHE_NAME = 'auth-token-id';
const USER_ID_CACHE_NAME = 'auth-user-id';

const getCachedCredential = () => ({
  token: localStorage.getItem(TOKEN_ID_CACHE_NAME),
  id: localStorage.getItem(USER_ID_CACHE_NAME),
});

const cacheCredential = async (credential: UserCredential) => {
  const user = credential?.user;
  if (!user) return credential;
  localStorage.setItem(TOKEN_ID_CACHE_NAME, await user.getIdToken());
  localStorage.setItem(USER_ID_CACHE_NAME, user.uid);
  return credential;
};

const signIn = async (provider: FirebaseSigninType) => {
  if ('password' in provider) {
    const { email, password } = provider;
    return cacheCredential(
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
    );
  }
  return cacheCredential(await signInWithPopup(FIREBASE_AUTH, new provider()));
};

const signup = async (provider: FirebaseSigninType) => {
  if ('password' in provider) {
    const { email, password } = provider;
    return await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
  }
  return await signIn(provider);
};

const signOut = async () => {
  await firebaseSignOut(FIREBASE_AUTH);
  localStorage.clear();
};

const resetPassword = async (email: string) => {
  return sendPasswordResetEmail(FIREBASE_AUTH, email);
};

const firebaseAuthProvider = {
  signIn,
  signOut,
  signup,
  resetPassword,
  cacheCredential,
  getCachedCredential,
};

export default firebaseAuthProvider;
