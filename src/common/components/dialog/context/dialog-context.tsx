import { createContext, FC, ReactNode } from 'react';
import { useToggle } from '@/common/hooks';
import { StateSetter } from '@/common/utils/types';

export type DialogContextType = {
  status: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setStatus: StateSetter<boolean>;
};

export const DIALOG_CONTEXT = createContext<DialogContextType | null>(null);

export const DialogContextProvider: FC<{
  defaultValue?: boolean;
  children: ReactNode;
}> = ({ defaultValue, children }) => {
  const { value, setTrue, setFalse, setValue, toggleValue } =
    useToggle(defaultValue);

  return (
    <DIALOG_CONTEXT.Provider
      value={{
        status: value,
        open: setTrue,
        close: setFalse,
        setStatus: setValue,
        toggle: toggleValue,
      }}
    >
      {children}
    </DIALOG_CONTEXT.Provider>
  );
};