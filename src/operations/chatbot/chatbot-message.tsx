import { Box, Typography } from '@mui/material';
import chatbotIcon from '@/assets/icons/chatbot.png';
import profileMe from '@/assets/profile-pic.jpg';
import { FC } from 'react';
import { usePalette } from '@/common/hooks';
import { FlexBox } from '@/common/components';

type Message = {
  isFromMe: boolean;
  content: string;
  senderImage: string;
  senderName: string;
};

const MESSAGES: Message[] = [
  {
    isFromMe: false,
    content: 'Hello',
    senderImage: chatbotIcon,
    senderName: 'Chatbot IA',
  },
  {
    isFromMe: false,
    content:
      "Je suis L'IA qui va esssayer de rien faire si je ne sais rien de tous",
    senderImage: chatbotIcon,
    senderName: 'Chatbot IA',
  },
  {
    isFromMe: true,
    content: 'Hello, I want something from you ?',
    senderImage: profileMe,
    senderName: 'Moi',
  },
  {
    isFromMe: false,
    content:
      "Je suis L'IA qui va esssayer de rien faire si je ne sais rien de tous",
    senderImage: chatbotIcon,
    senderName: 'Chatbot IA',
  },
  {
    isFromMe: true,
    content: 'Ok, Nice',
    senderImage: profileMe,
    senderName: 'Moi',
  },
];

export const MessageContent: FC<{ message: Message }> = (props) => {
  const { content, isFromMe, senderName, senderImage } = props.message;
  const { palette, bgcolor, primaryColor } = usePalette();

  return (
    <FlexBox
      sx={{
        ml: isFromMe ? 'auto' : undefined,
        mr: !isFromMe ? 'auto' : undefined,
        width: 'fit-content',
        maxWidth: '80%',
        gap: 1,
        alignItems: 'end',
        justifyContent: isFromMe ? 'start' : 'center',
        mt: 1,
        mb: 2,
      }}
    >
      {!isFromMe && (
        <img
          src={senderImage}
          style={{
            display: 'bloc',
            width: '25px',
            height: '25px',
            borderRadius: '50%',
          }}
          alt={senderName}
        />
      )}
      <Typography
        sx={{
          py: 1,
          fontSize: '14px',
          color: !isFromMe ? 'white' : bgcolor,
          px: 2,
          borderRadius: '15px',
          bgcolor: !isFromMe ? palette.primary.main : primaryColor,
        }}
      >
        {content}
      </Typography>
      {isFromMe && (
        <img
          src={senderImage}
          style={{
            display: 'bloc',
            width: '25px',
            height: '25px',
            borderRadius: '50%',
          }}
          alt={senderName}
        />
      )}
    </FlexBox>
  );
};

export const ChatbotMessage = () => {
  return (
    <Box sx={{ width: '100%', maxHeight: '300px', overflowY: 'scroll' }}>
      {MESSAGES.map((message, index) => {
        return <MessageContent key={index} message={message} />;
      })}
    </Box>
  );
};
