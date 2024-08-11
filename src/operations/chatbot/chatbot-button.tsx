import { IconButton, SxProps } from '@mui/material';
import {
  DialogContextProvider,
  useDialogContext,
} from '@/common/services/dialog';
import { ChatbotDialog } from './chatbot-dialog';
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

export const ChatbotButton = () => {
  return (
    <DialogContextProvider popover>
      <ChatbotButtonContent />
    </DialogContextProvider>
  );
};

export const ChatbotButtonContent = () => {
  const { open } = useDialogContext<true>();

  return (
    <>
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
      <ChatbotDialog />
    </>
  );
};
