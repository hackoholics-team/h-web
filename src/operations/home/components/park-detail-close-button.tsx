import { useDialogContext } from '@/common/services/dialog';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

export const CloseDialogButton = () => {
  const { close } = useDialogContext();
  return (
    <IconButton sx={{ position: 'absolute', top: 5, right: 5 }} onClick={close}>
      <Close />
    </IconButton>
  );
};
