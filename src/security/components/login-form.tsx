import {
  PasswordInput,
  SimpleForm,
  TextInput,
  email,
  required,
  useTranslate,
} from 'react-admin';
import { Button } from '@mui/material';
import { FlexBox } from '@/common/components/box';
import { LoginFormToolbar } from './login-form-toolbar';
import { useLogin } from '../hooks';
import { confirmPasswordValidator } from '@/common/input-validator';

export const LoginForm = () => {
  const translate = useTranslate();
  const { view, setView } = useLogin();

  return (
    <>
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
                setView('signup');
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
              setView('signin');
            }}
          >
            {translate('ha.text.alreadyHaveAccount')}
            <span style={{ textDecoration: 'underline', marginLeft: 5 }}>
              {translate(`ha.words.signin`)}
            </span>
          </Button>
        )}
      </FlexBox>
    </>
  );
};
