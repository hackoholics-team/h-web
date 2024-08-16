import { useDialogContext } from '@/common/services/dialog';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

export const CloseDialogButton = () => {
  const { close } = useDialogContext();
  return (
    <IconButton onClick={close}>
      <Close />
    </IconButton>
  );
};
