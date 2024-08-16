export const USER_ID_CACHE_NAME = 'user-id';

export const useGetConnectedId = () => {
  return () => localStorage.getItem(USER_ID_CACHE_NAME)!;
};

export const saveConnectedId = (id: string) => {
  return localStorage.setItem(USER_ID_CACHE_NAME, id);
};
