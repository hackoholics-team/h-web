import {
  PasswordInput,
  SimpleForm,
  TextInput,
  email,
  required,
  useTranslate,
} from 'react-admin';
import { Button, Typography, Box } from '@mui/material';
import { FlexBox } from '@/common/components/box';
import { LoginFormToolbar } from './login-form-toolbar';
import { useLogin } from '../hooks';
import { confirmPasswordValidator } from '@/common/input-validator';

export const LoginForm = () => {
  const translate = useTranslate();
  const { view, setLoginView } = useLogin();

  return (
    <Box flex={1} p={5}>
      <Typography fontWeight="bold" fontSize="1.2rem">
        Create account
      </Typography>
      <Typography fontSize="14px" mb={2}>
        Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
        cillum sint consectetur.
      </Typography>
      <Box width="100%" maxWidth="400px">
        <SimpleForm pl={0} toolbar={<LoginFormToolbar />}>
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
          {view === 'signup' && (
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
          )}
        </SimpleForm>
        <FlexBox sx={{ flexDirection: 'column', alignItems: 'end' }}>
          {view === 'signin' && (
            <>
              <Button
                variant="text"
                sx={{ '&:hover': { textDecoration: 'underline' }, 'p': 0 }}
              >
                {translate('ha.text.forgotPassword')}
              </Button>
              <Button
                variant="text"
                sx={{ '&:hover': { textDecoration: 'underline' }, 'p': 0 }}
                onClick={() => {
                  setLoginView('signup');
                }}
              >
                {translate('ha.text.doesNotHaveAccountYet')}
                <span style={{ textDecoration: 'underline', marginLeft: 5 }}>
                  {translate(`ha.words.signup`)}
                </span>
              </Button>
            </>
          )}
          {view === 'signup' && (
            <Button
              sx={{ '&:hover': { textDecoration: 'underline' }, 'p': 0 }}
              variant="text"
              onClick={() => {
                setLoginView('signin');
              }}
            >
              {translate('ha.text.alreadyHaveAccount')}
              <span style={{ textDecoration: 'underline', marginLeft: 5 }}>
                {translate(`ha.words.signin`)}
              </span>
            </Button>
          )}
        </FlexBox>
      </Box>
    </Box>
  );
};
