import { MouseEvent, useState } from 'react';
import { IconButton, SxProps } from '@mui/material';
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
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const closePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton
        size="large"
        sx={{ ...CHATBOT_BUTTON_SX }}
        onClick={openPopover}
      >
        <img
          alt="chatbot"
          src={chatbotIcon}
          style={{
            width: '45px',
            height: '45px',
          }}
        />
      </IconButton>
      <ChatbotDialog
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closePopover}
      />
    </>
  );
};
