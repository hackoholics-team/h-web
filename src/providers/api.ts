import {
  FileApi,
  PlaceApi,
  SecurityApi,
  UserApi,
  PayingApi,
} from '@/gen/client';
import { getConfiguration } from './utils';

export const securityApi = () => new SecurityApi(getConfiguration());
export const userApi = () => new UserApi(getConfiguration());
export const placeApi = () => new PlaceApi(getConfiguration());
export const fileApi = () => new FileApi(getConfiguration());
export const payingApi = () => new PayingApi(getConfiguration());
