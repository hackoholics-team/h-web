import {
  Button,
  PasswordInput,
  SimpleForm,
  TextInput,
  Toolbar,
} from 'react-admin';
import { Typography, Box } from '@mui/material';

export const SignupUi = () => {
  return (
    <Box flex={1} sx={{ p: 5 }}>
      <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        Create account
      </Typography>
      <Typography fontSize="14px" mb={3}>
        Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
        cillum sint consectetur cupidatat.
      </Typography>
      <Box sx={{ width: '100%', maxWidth: '400px' }}>
        <SimpleForm
          sx={{ pl: 0 }}
          toolbar={
            <Toolbar>
              <Button label="Signup" size="small" variant="contained" />
            </Toolbar>
          }
        >
          <TextInput
            variant="filled"
            fullWidth
            source="email"
            label="Email"
            type="email"
          />
          <PasswordInput
            variant="filled"
            fullWidth
            source="password"
            label="source"
          />
          <PasswordInput
            variant="filled"
            fullWidth
            source="confirmPassword"
            label="Confirm your Password"
          />
        </SimpleForm>
      </Box>
    </Box>
  );
};
