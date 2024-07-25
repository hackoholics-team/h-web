import {
  Button,
  email,
  PasswordInput,
  required,
  SimpleForm,
  TextInput,
  Toolbar,
  useTranslate,
} from 'react-admin';
import { Typography, Box } from '@mui/material';
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
        cillum sint consectetur cupidatat.
      </Typography>
      <Box width="100%" maxWidth="400px">
        <SimpleForm
          pl={0}
          toolbar={
            <Toolbar sx={{ mt: 1 }}>
              <Button
                type="submit"
                label="Signup"
                size="small"
                variant="contained"
              />
            </Toolbar>
          }
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
