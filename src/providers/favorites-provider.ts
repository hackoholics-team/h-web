import { userApi } from './api';
import { HackoholicDataProvider } from './types';

export const favoritesProvider: HackoholicDataProvider<{
  placeId: string;
  id: number;
}> = {
  getList: ({ meta: { userId } }: { meta: { userId: string } }) => {
    return userApi()
      .getRequirements(userId)
      .then((response) => response.data.map((e, i) => ({ placeId: e, id: i })));
  },
  getOne: () => {
    throw new Error('Not Implemented');
  },
  delete: () => {
    throw new Error('Not Implemented');
  },
  saveOrUpdate: () => {
    throw new Error('Not Implemented');
  },
};
