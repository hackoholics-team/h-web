import {
  PasswordInput,
  SimpleForm,
  TextInput,
  email,
  required,
  useTranslate,
} from 'react-admin';
import { Typography, Box } from '@mui/material';
import { LoginFormToolbar } from './login-form-toolbar';
import { confirmPasswordValidator } from '@/common/input-validator';

export const SignupUi = () => {
  const translate = useTranslate();

  return (
    <Box flex={1} p={5}>
      <Typography fontWeight="bold" fontSize="1.2rem">
        Create account
      </Typography>
      <Typography fontSize="14px" mb={3}>
        Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
        cillum sint consectetur.
      </Typography>
      <Box width="100%" maxWidth="400px">
        <SimpleForm pl={0} toolbar={<LoginFormToolbar loginType="signup" />}>
          <TextInput
            variant="filled"
            fullWidth
            source="email"
            type="email"
            label="Email"
            validate={[required(), email()]}
          />
          <PasswordInput
            fullWidth
            validate={required()}
            variant="filled"
            source="password"
            label="Password"
          />
          <PasswordInput
            variant="filled"
            fullWidth
            source="confirmPassword"
            label={translate('ha.login.forms.confirmPassword.label')}
            validate={confirmPasswordValidator(
              'password',
              translate('ha.login.forms.confirmPassword.error')
            )}
          />
        </SimpleForm>
      </Box>
    </Box>
  );
};
