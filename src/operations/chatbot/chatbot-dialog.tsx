import { Popover, IconButton, Box, Typography, Divider } from '@mui/material';
import {
  Settings as SettingsIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { FlexBox } from '@/common/components';
import { ChatbotMessage } from './chatbot-message';
import { ChatbotForm } from './chatbot-form';
import { usePalette } from '@/common/hooks';
import { useDialogContext } from '@/common/services/dialog';
import chatbotIcon from '@/assets/icons/chatbot.png';

export const ChatbotDialog = () => {
  const { bgcolor } = usePalette();
  const { anchorEl, status, close } = useDialogContext<true>();

  return (
    <Popover
      open={status}
      anchorEl={anchorEl}
      onClose={close}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      sx={{ borderRadius: '15px' }}
    >
      <Box sx={{ px: 1, borderRadius: '15px', bgcolor, width: '350px' }}>
        <FlexBox sx={{ justifyContent: 'space-between' }}>
          <FlexBox sx={{ gap: 1, alignItems: 'end', p: 0 }}>
            <img
              src={chatbotIcon}
              style={{ width: '25px', height: '25px', display: 'block' }}
              alt="chatbot"
            />
            <Typography
              sx={{ p: 0, m: 0, fontSize: '14px', fontWeight: 'bold' }}
            >
              Assistant IA
            </Typography>
            <Divider /> {/* TODO: fix the color here bro */}
          </FlexBox>
          <FlexBox sx={{}}>
            <IconButton>
              <SettingsIcon />
            </IconButton>
            <IconButton onClick={close}>
              <CloseIcon />
            </IconButton>
          </FlexBox>
        </FlexBox>
        <ChatbotMessage />
        <ChatbotForm />
      </Box>
    </Popover>
  );
};
