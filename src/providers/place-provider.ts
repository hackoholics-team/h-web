import { placeApi } from './api';
import { HackoholicDataProvider } from './types';
import { PlacesSearchResult } from '@/gen/client';

export const placeProvider: HackoholicDataProvider<PlacesSearchResult> = {
  delete: () => {
    throw new Error('Not Implemented');
  },
  getOne: async ({ id }) => {
    return placeApi()
      .aboutParksOrReserve(id)
      .then((response) => ({ ...response.data, id: response.data.placeId }));
  },
  saveOrUpdate: () => {
    throw new Error('Not Implemented');
  },
  getList: async ({ meta: { location } }) => {
    return placeApi()
      .getParkAndNReserve(location)
      .then((response) =>
        response.data.map((place) => ({ ...place, id: place.placeId }))
      );
  },
};
