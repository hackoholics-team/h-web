import { SecurityApi } from '@/gen/client';
import { getConfiguration } from './utils';

export const securityApi = () => new SecurityApi(getConfiguration());
