import { useContext } from 'react';
import { DIALOG_CONTEXT } from '../context';

export const useDialogContext = () => {
  const dialogContext = useContext(DIALOG_CONTEXT);

  if (dialogContext === null) {
    throw new Error('useDialogContext must be wrapper by DIALOG_CONTEXT');
  }

  return dialogContext;
};
