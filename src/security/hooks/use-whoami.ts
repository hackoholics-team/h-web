import authFirebase from '../firebase-auth-provider';

export const useWhoami = () => {
  return authFirebase.getCachedCredential();
};
