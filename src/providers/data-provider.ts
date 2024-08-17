import { DataProvider } from 'react-admin';
import { HackoholicDataProvider } from './types';
import { dummyProvider } from './dummy-provider';
import { userProvider } from './user-provider';
import { placeProvider } from './place-provider';
import { favoritesProvider } from './favorites-provider';

export const getProvider = (resource: string): HackoholicDataProvider<any> => {
  switch (resource) {
    case 'profiles':
      return userProvider;
    case 'places':
      return placeProvider;
    case 'dummies':
      return dummyProvider;
    case 'favorites':
      return favoritesProvider;
    default:
      throw new Error('Unknown resource type');
  }
};

export const dataProvider: DataProvider = {
  create: async (resource, { meta, data: payload }) => {
    const response = await getProvider(resource).saveOrUpdate({
      payload,
      meta: {
        ...meta,
        mutationType: 'CREATE',
      },
    });
    return { data: response };
  },
  update: async (resource, { data: payload, meta }) => {
    const response = await getProvider(resource).saveOrUpdate({
      payload,
      meta: {
        ...meta,
        mutationType: 'UPDATE',
      },
    });
    return { data: response };
  },
  getList: async (resource, { pagination, sort, filter, meta }) => {
    const response = await getProvider(resource).getList({
      page: pagination?.page || 1,
      pageSize: pagination?.perPage || 10,
      filter,
      sort,
      meta,
    });

    return {
      data: response,
      total: response.length,
      pageInfo: {
        // FIXME: fix pagination: one way to do it is to fetch the next page and check if there are still elements
        hasNextPage: response.length >= (pagination?.perPage || 10),
        hasPreviousPage: (pagination?.page || 1) > 1,
      },
    };
  },
  getOne: async (resource, { id: payloadId, meta }) => {
    const response = await getProvider(resource).getOne({
      id: payloadId as string,
      meta,
    });
    return { data: response };
  },
  delete: async (resource, { id: payloadId, meta }) => {
    const response = await getProvider(resource).delete({
      id: payloadId as string,
      meta,
    });
    return { data: response };
  },
  deleteMany: () => {
    throw new Error('Not Implemented');
  },
  getMany: () => {
    throw new Error('Not Implemented');
  },
  getManyReference: () => {
    throw new Error('Not Implemented');
  },
  updateMany: () => {
    throw new Error('Not Implemented');
  },
};
