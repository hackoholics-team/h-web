import { SxProps, Box, Typography, Divider } from '@mui/material';
import {
  Settings as SettingsIcon,
  Close as CloseIcon,
  OpenInFull as OpenFullScreenIcon,
  CloseFullscreen as CloseFullScreenIcon,
} from '@mui/icons-material';
import { FlexBox, Popover, TooltipIconButton } from '@/common/components';
import { ChatbotMessage } from './chatbot-message';
import { ChatbotForm } from './chatbot-form';
import { usePalette, useToggle } from '@/common/hooks';
import { useDialogContext } from '@/common/services/dialog';
import chatbotIcon from '@/assets/icons/chatbot.png';

const CHATBOT_BUTTON_SX: SxProps = {
  'position': 'fixed !important',
  'bottom': '20px',
  'right': '20px',
  'width': '20px',
  'transition': 'all 0.5s linear',
  'zIndex': 999999,
  '&:hover': {
    scale: '1.05 !important',
    bgcolor: 'transparent !important',
  },
};

export const ChatbotCloseButton = () => {
  const { close } = useDialogContext<true>();
  return (
    <TooltipIconButton title="Close Chat AI" onClick={close}>
      <CloseIcon />
    </TooltipIconButton>
  );
};

export const ChatbotButton = () => {
  const { open } = useDialogContext<true>();
  return (
    <TooltipIconButton
      title="Hello, Ask me anything you want"
      size="large"
      sx={{ ...CHATBOT_BUTTON_SX }}
      onClick={open}
    >
      <img
        alt="chatbot"
        src={chatbotIcon}
        style={{
          width: '38px',
          height: '38px',
        }}
      />
    </TooltipIconButton>
  );
};

export const ChatbotDialog = () => {
  const { bgcolor } = usePalette();
  const { value: isPopoverExpanded, toggleValue: toggleIsPopoverExpanded } =
    useToggle();

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
      <Box
        sx={{
          px: 1,
          borderRadius: '15px',
          bgcolor,
          width: isPopoverExpanded ? '750px' : '400px',
        }}
      >
        <FlexBox sx={{ justifyContent: 'space-between' }}>
          <FlexBox sx={{ gap: 1, alignItems: 'end', p: 0 }}>
            <img
              src={chatbotIcon}
              style={{ width: '25px', height: '25px', display: 'block' }}
              alt="chatbot"
            />
            <Typography
              sx={{ p: 0, m: 0, fontSize: '13px', fontWeight: 'bold' }}
            >
              Assistant IA
            </Typography>
          </FlexBox>
          <FlexBox>
            <TooltipIconButton title="Settings">
              <SettingsIcon />
            </TooltipIconButton>
            <TooltipIconButton
              title={
                isPopoverExpanded
                  ? 'Minimize Chat Dialog'
                  : 'Maximize Chat Dialog'
              }
              onClick={toggleIsPopoverExpanded}
            >
              {isPopoverExpanded ? (
                <CloseFullScreenIcon />
              ) : (
                <OpenFullScreenIcon />
              )}
            </TooltipIconButton>
            <ChatbotCloseButton />
          </FlexBox>
        </FlexBox>
        <Divider sx={{ width: '98%', mx: 'auto' }} />{' '}
        {/* TODO: fix the color here bro */}
        <ChatbotMessage />
        <ChatbotForm />
      </Box>
    </Popover>
  );
};
