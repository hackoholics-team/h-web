import { HackoholicDataProvider } from './types';

export type Dummy = {
  id: string;
  name: string;
};

const DUMMIES_MOCK: Dummy[] = [
  {
    id: '1',
    name: 'name1',
  },
  {
    id: '2',
    name: 'name2',
  },
  {
    id: '3',
    name: 'name3',
  },
  {
    id: '4',
    name: 'name4',
  },
  {
    id: '5',
    name: 'name5',
  },
  {
    id: '6',
    name: 'name2',
  },
  {
    id: '7',
    name: 'name3',
  },
  {
    id: '8',
    name: 'name5',
  },
  {
    id: '9',
    name: 'name5',
  },
  {
    id: '10',
    name: 'name5',
  },
  {
    id: '11',
    name: 'name6',
  },
];

export const dummyProvider: HackoholicDataProvider<Dummy> = {
  getList: () => {
    return Promise.resolve(DUMMIES_MOCK);
  },
  getOne: ({ id }) => {
    return Promise.resolve(DUMMIES_MOCK.find((dummy) => dummy.id == id)!);
  },
  saveOrUpdate: ({ meta }) => {
    const { mutationType } = meta;
    if (mutationType === 'CREATE') {
      throw new Error('Not implemented');
    }
    throw new Error('Not implemented');
  },
  delete: () => {
    throw new Error('Not implemented');
  },
};
