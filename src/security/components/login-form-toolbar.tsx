import { FC } from 'react';
import { Button, Toolbar, useTranslate } from 'react-admin';
import { Typography, SxProps, Button as MuiButton } from '@mui/material';
import { FlexBox } from '@/common/components/box';
import { GoogleAuthProvider } from 'firebase/auth';
import { useLogin } from '../hooks';
import googleIcon from '@/assets/google.svg';

export type LoginType = 'signin' | 'signup';

const GOOGLE_LOGIN_SX: SxProps = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  px: 2,
  py: 1,
};

export const LoginWithGoogleButton: FC = () => {
  const { isLoading, login } = useLogin();

  return (
    <MuiButton
      size="medium"
      variant="text"
      color="inherit"
      disabled={isLoading}
      onClick={() => {
        login(GoogleAuthProvider, 'Unauthorized !!');
      }}
      sx={GOOGLE_LOGIN_SX}
    >
      <img
        src={googleIcon}
        style={{ display: 'block', width: '25px', height: '25px' }}
        alt="Google"
      />
      Google
    </MuiButton>
  );
};

export const LoginFormToolbar: FC<{ loginType: LoginType }> = ({
  loginType,
}) => {
  const translate = useTranslate();

  return (
    <Toolbar sx={{ p: 0 }}>
      <FlexBox sx={{ gap: 1 }}>
        <Button
          type="submit"
          size="small"
          variant="contained"
          label={translate(`ha.login.buttons.${loginType}`)}
        />
        <Typography sx={{ mx: 2, color: 'gray', fontSize: '14px' }}>
          {' '}
          {translate('ha.words.or')}{' '}
        </Typography>
        <LoginWithGoogleButton />
      </FlexBox>
    </Toolbar>
  );
};
