import { useTranslate } from 'react-admin';
import {
  Typography,
  SxProps,
  Box,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { FlexBox, ThemeAndLocaleSwitch } from '@/common/components';
import { LoginForm } from './login-form';
import { LoginLoadingContext } from '../context';
import { LoginCompleteInfo } from './complete-info';
import { useLogin } from '../hooks';
import { usePalette } from '@/common/hooks';
import loginIllustration from '@/assets/login-illustration.png';

const LOGIN_PAGE_SX: SxProps = {
  alignItems: 'start',
  minHeight: '85vh',
  width: '850px',
  boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
  position: 'relative',
  borderRadius: '8px',
};

const ILLUSTRATION_BOX_SX: SxProps = {
  flex: 1,
  minHeight: '85vh',
  borderTopLeftRadius: '8px',
  borderBottomLeftRadius: '8px',
  p: 3,
  flexDirection: 'column',
};

const ILLUSTRATION_HEADER_TEXT_SX: SxProps = {
  textAlign: 'center',
  fontSize: '1.7rem',
  color: 'white',
  mb: 2,
  fontWeight: 'bold',
};

export const LoginPage = () => (
  <LoginLoadingContext>
    <LoginPageContent />
  </LoginLoadingContext>
);

export const LoginPageContent = () => {
  const { palette } = usePalette();
  const { view, isLoading } = useLogin();
  const translate = useTranslate();

  return (
    <>
      <FlexBox
        sx={{
          bgcolor: palette.background.paper,
          minHeight: '100vh',
          position: 'relative',
          width: '100%',
        }}
      >
        <FlexBox sx={{ ...LOGIN_PAGE_SX, bgcolor: palette.background.default }}>
          <FlexBox
            sx={{
              ...ILLUSTRATION_BOX_SX,
              bgcolor: palette.primary.main,
            }}
          >
            <Typography sx={ILLUSTRATION_HEADER_TEXT_SX} variant="h2">
              {translate('ha.login.illustration.header')}
            </Typography>
            <Typography
              sx={{ fontSize: '15px', textAlign: 'center', color: 'white' }}
            >
              Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </Typography>
            <img
              width={250}
              src={loginIllustration}
              alt="hackoholics-login"
              style={{ display: 'block' }}
            />
            <Typography
              sx={{ textAlign: 'center', color: 'white', fontSize: '15px' }}
            >
              Trouver ici notre{' '}
              <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                Règle Génerale
              </span>
            </Typography>
          </FlexBox>
          <Box flex={1} mt={1} py={5} px={4}>
            <Typography fontWeight="bold" fontSize="1.2rem">
              {translate(`ha.login.${view}.title`)}
            </Typography>
            <Typography fontSize="14px" mb={2}>
              {translate(`ha.login.${view}.description`)}
            </Typography>
            <Box width="100%" maxWidth="400px">
              {(view === 'signup' || view === 'signin') && <LoginForm />}
              {view === 'completeInfo' && <LoginCompleteInfo />}
            </Box>
          </Box>
          <ThemeAndLocaleSwitch />
        </FlexBox>
      </FlexBox>
      <Backdrop
        open={isLoading}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};
