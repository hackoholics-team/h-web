// import { HackoholicDataProvider } from './types';
// import { User } from '@/gen/client';
// import { securityApi } from './api';
// import profilePic from '@/assets/profile-pic.jpg';

// export const userProvider: HackoholicDataProvider<User> = {
//   getList: () => {
//     throw new Error('Not Impelemented');
//   },
//   getOne: async () => {
//     return securityApi().signIn().then((response) => {
//       return ({ ...response.data, photoId: profilePic, id: response.data.firebaseId })
//     })
//   },
//   saveOrUpdate: () => {
//     throw new Error('Not Impelemented');
//   },
//   delete: () => {
//     throw new Error('Not Impelemented');
//   },
// };

import { HackoholicDataProvider } from './types';
import { User } from '@/gen/client';
import profilePic from '@/assets/profile-pic.jpg';

const MOCK_USER: User = {
  id: 'dummyId',
  email: 'johndoe@gmail.com',
  firstName: 'John',
  lastName: 'Doe',
  username: 'John Doe',
  firebaseId: '8520258520',
  photoId: profilePic,
  birthDate: new Date().toISOString(),
};

export const userProvider: HackoholicDataProvider<User> = {
  getList: () => {
    throw new Error('Not Impelemented');
  },
  getOne: () => {
    return Promise.resolve(MOCK_USER);
  },
  saveOrUpdate: () => {
    throw new Error('Not Impelemented');
  },
  delete: () => {
    throw new Error('Not Impelemented');
  },
};
