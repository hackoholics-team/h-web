import { FC, ReactElement, ReactNode } from 'react';
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from '@mui/material';
import { DialogContext } from './context';
import { useDialogContext } from './hooks';

export type DialogProps = Partial<MuiDialogProps> & {
  defaultValue?: boolean;
  actionHandler: ReactElement;
  children: ReactNode;
};

export const Dialog: FC<DialogProps> = ({
  defaultValue,
  children,
  actionHandler,
  ...dialogProps
}) => {
  return (
    <DialogContext defaultValue={defaultValue}>
      {actionHandler}
      <DialogContent {...dialogProps}>{children}</DialogContent>
    </DialogContext>
  );
};

export const DialogContent: FC<
  Omit<DialogProps, 'defaultValue' | 'actionHandler'>
> = ({ children, ...dialogProps }) => {
  const { status, close } = useDialogContext();
  return (
    <MuiDialog open={status} onClose={close} hideBackdrop {...dialogProps}>
      {children}
    </MuiDialog>
  );
};
