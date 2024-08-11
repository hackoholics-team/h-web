import { ChatApi, SecurityApi } from '@/gen/client';
import { createClientApi } from './utils';

export const securityApi = createClientApi(SecurityApi);
export const chatbotApi = createClientApi(ChatApi);
