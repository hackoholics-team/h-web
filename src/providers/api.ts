import { PlaceApi, SecurityApi, UserApi } from '@/gen/client';
import { getConfiguration } from './utils';

export const securityApi = () => new SecurityApi(getConfiguration());
export const userApi = () => new UserApi(getConfiguration());
export const placeApi = () => new PlaceApi(getConfiguration());
