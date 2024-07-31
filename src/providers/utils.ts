import { Configuration } from '@/gen/client';
import { firebaseAuthProvider } from './firebase-auth-provider';

export const getConfiguration = () => {
  const configuration = new Configuration();
  const { token } = firebaseAuthProvider.getCachedCredential();
  configuration.accessToken = token!;
  return configuration;
};
