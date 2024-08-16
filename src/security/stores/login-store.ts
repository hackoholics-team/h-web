import { create } from 'zustand';

export type LoginViewType = 'signin' | 'signup';

export type UseLoginStoreType = {
  view: LoginViewType;
  isLoading: boolean;
  setView: (newValue: LoginViewType) => void;
  setIsLoading: (status: boolean) => void;
};

export const useLoginStore = create<UseLoginStoreType>((set) => ({
  view: 'signin',
  isLoading: false,
  setView: (newValue) => set({ view: newValue }),
  setIsLoading: (status) => set({ isLoading: status }),
}));
