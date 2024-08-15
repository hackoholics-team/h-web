import { FlexBox, TooltipIconButton } from '@/common/components';
import { Send as SendIcon, Image } from '@mui/icons-material';
import { required, SimpleForm, TextInput } from 'react-admin';

export const ChatbotForm = () => {
  const sendMessage = (event: any) => {
    event.preventDefault();
    console.log('Hello world');
  };

  return (
    <FlexBox
      sx={{
        'p': 1,
        'width': '100%',
        '& form': { width: '100%' },
        'justifyContent': 'space-between',
        'px': 1,
      }}
    >
      <SimpleForm
        disableInvalidFormNotification
        sx={{ pb: '0 !important' }}
        toolbar={false}
        onSubmit={sendMessage}
      >
        <FlexBox sx={{ gap: 1, width: '100%', alignItems: 'start' }}>
          <TextInput
            multiline
            fullWidth
            label=""
            required
            helperText={false}
            validate={required()}
            source="message"
            variant="outlined"
            placeholder="Ex: How to use hackoholics ?"
            sx={{
              '& textarea': { maxHeight: '80px', overflowY: 'scroll' },
            }}
            InputProps={{
              sx: { borderRadius: '15px', fontSize: '13px' },
            }}
          />
          <TooltipIconButton title="Upload an image" color="primary">
            <Image />
          </TooltipIconButton>
          <TooltipIconButton title="Submit" color="primary">
            <SendIcon />
          </TooltipIconButton>
        </FlexBox>
      </SimpleForm>
    </FlexBox>
  );
};
