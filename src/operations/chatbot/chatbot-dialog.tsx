import { IconButton, SxProps, Box, Typography, Divider } from '@mui/material';
import {
  Settings as SettingsIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { FlexBox, Popover } from '@/common/components';
import { ChatbotMessage } from './chatbot-message';
import { ChatbotForm } from './chatbot-form';
import { usePalette } from '@/common/hooks';
import { useDialogContext } from '@/common/services/dialog';
import chatbotIcon from '@/assets/icons/chatbot.png';

const CHATBOT_BUTTON_SX: SxProps = {
  'position': 'fixed !important',
  'bottom': '20px',
  'right': '20px',
  'width': '20px',
  'borderRadius': '50%',
  'transition': 'all 0.5s linear',
  'zIndex': 999999,
  '&:hover': {
    scale: '1.05 !important',
  },
};

export const ChatbotCloseButton = () => {
  const { close } = useDialogContext<true>();
  return (
    <IconButton onClick={close}>
      <CloseIcon />
    </IconButton>
  );
};

export const ChatbotButton = () => {
  const { open } = useDialogContext<true>();
  return (
    <IconButton size="large" sx={{ ...CHATBOT_BUTTON_SX }} onClick={open}>
      <img
        alt="chatbot"
        src={chatbotIcon}
        style={{
          width: '45px',
          height: '45px',
        }}
      />
    </IconButton>
  );
};

export const ChatbotDialog = () => {
  const { bgcolor } = usePalette();
  return (
    <Popover
      actionHandler={<ChatbotButton />}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
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
            <ChatbotCloseButton />
          </FlexBox>
        </FlexBox>
        <ChatbotMessage />
        <ChatbotForm />
      </Box>
    </Popover>
  );
};
