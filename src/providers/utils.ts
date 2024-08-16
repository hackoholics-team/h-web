import { Configuration } from '@/gen/client';
import { firebaseAuthProvider } from './firebase-auth-provider';

export type ClientApiType<T> = {
  new (configuration: Configuration): T;
};

export const getConfiguration = () => {
  const configuration = new Configuration();
  const { token } = firebaseAuthProvider.getCachedCredential();
  configuration.accessToken = token!;
  return configuration;
};
