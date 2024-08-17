import { PaymentMethod } from '@/gen/client';
import { HackoholicDataProvider } from './types';
import { payingApi } from './api';

export const paymentMethodProvider: HackoholicDataProvider<PaymentMethod> = {
  getList: async ({ meta }) => {
    return payingApi()
      .getPaymentMethods(meta.userId)
      .then((response) => response.data);
  },
  getOne: () => {
    throw new Error('Not Implemented');
  },
  saveOrUpdate: () => {
    throw new Error('Not Implemented');
  },
  delete: () => {
    throw new Error('Not Implemented');
  },
};
