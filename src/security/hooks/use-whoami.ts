import { firebaseAuthProvider } from '@/providers';

export const useWhoami = () => {
  return firebaseAuthProvider.getCachedCredential();
};
