import { Toolbar, useTranslate } from 'react-admin';
import { Typography, CircularProgress, SxProps, Button } from '@mui/material';
import { FlexBox } from '@/common/components/box';
import { GoogleAuthProvider } from 'firebase/auth';
import { useLogin } from '../hooks';
import googleIcon from '@/assets/google.svg';

const GOOGLE_LOGIN_SX: SxProps = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  px: 2,
  py: 1,
};

export const LoginWithGoogleButton = () => {
  const { isLoading, login } = useLogin();

  return (
    <Button
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
    </Button>
  );
};

export const LoginFormToolbar = () => {
  const translate = useTranslate();
  const { isLoading, view } = useLogin();

  return (
    <Toolbar sx={{ mb: 1, p: 0 }}>
      <FlexBox sx={{ gap: 1 }}>
        <Button
          type="submit"
          sx={{ display: 'inline-flex', px: 2, gap: 1 }}
          size="small"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading && <CircularProgress color="primary" size={15} />}
          {translate(`ha.words.${view}`)}
        </Button>
        <Typography sx={{ mx: 2, color: 'gray', fontSize: '14px' }}>
          {' '}
          {translate('ha.words.or')}{' '}
        </Typography>
        <LoginWithGoogleButton />
      </FlexBox>
    </Toolbar>
  );
};
