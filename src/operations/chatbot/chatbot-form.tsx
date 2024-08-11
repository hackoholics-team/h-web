import { FlexBox } from '@/common/components';
import { TextField, IconButton } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

export const ChatbotForm = () => {
  const sendMessage = (event: any) => {
    event.preventDefault();
    console.log('Hello world');
  };

  return (
    <FlexBox
      sx={{ p: 1, width: '100%', justifyContent: 'space-between', px: 1 }}
    >
      <form onSubmit={sendMessage} style={{ width: '100%' }}>
        <FlexBox sx={{ gap: 1 }}>
          <TextField
            name="message"
            multiline
            required
            variant="outlined"
            sx={{ width: '100%' }}
          />
          <IconButton color="primary">
            <SendIcon />
          </IconButton>
        </FlexBox>
      </form>
    </FlexBox>
  );
};
