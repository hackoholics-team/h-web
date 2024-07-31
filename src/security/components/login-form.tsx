import {
  PasswordInput,
  SimpleForm,
  TextInput,
  email,
  required,
  useTranslate,
  useLogin as useRaLogin,
} from 'react-admin';
import { Button } from '@mui/material';
import { FlexBox } from '@/common/components/box';
import { LoginFormToolbar } from './login-form-toolbar';
import { SigninProviderType } from '@/providers';
import { useLogin } from '../hooks';
import { confirmPasswordValidator } from '@/common/input-validator';
import { NOOP_FN } from '@/common/utils/noop';

export const LoginForm = () => {
  const translate = useTranslate();
  const login = useRaLogin();
  const { view, setView } = useLogin();

  return (
    <>
      <SimpleForm
        onInvalid={NOOP_FN}
        onSubmit={(formValues: unknown) =>
          login(formValues as SigninProviderType)
        }
        pl={0}
        toolbar={<LoginFormToolbar />}
      >
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
              {translate('ha.text.doesNotHaveAccountYet')}{' '}
              {translate(`ha.words.signup`)}
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
            {translate('ha.text.alreadyHaveAccount')}{' '}
            {translate(`ha.words.signin`)}
          </Button>
        )}
      </FlexBox>
    </>
  );
};
