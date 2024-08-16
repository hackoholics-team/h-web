import { HackoholicDataProvider } from './types';
import { User } from '@/gen/client';
import { securityApi } from './api';

export const userProvider: HackoholicDataProvider<User> = {
  getList: () => {
    throw new Error('Not Impelemented');
  },
  getOne: async () => {
    return securityApi()
      .signIn()
      .then((response) => {
        return { ...response.data, id: response.data.firebaseId };
      });
  },
  saveOrUpdate: () => {
    throw new Error('Not Impelemented');
  },
  delete: () => {
    throw new Error('Not Impelemented');
  },
};
