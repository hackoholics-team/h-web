import { useTranslate } from 'react-admin';
import {
  Typography,
  SxProps,
  Box,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { FlexBox } from '@/common/components';
import { LoginForm } from './login-form';
import { LoginLoadingContext } from '../context';
import { LoginCompleteInfo } from './complete-info';
import { NoLayout } from '@/layout';
import { useLogin } from '../hooks';
import { useIsDarkTheme, usePalette } from '@/common/hooks';
import loginIllustration from '@/assets/login-illustration.png';

const LOGIN_PAGE_SX: SxProps = {
  alignItems: 'start',
  width: '100%',
  px: 7,
  position: 'relative',
};

const ILLUSTRATION_BOX_SX: SxProps = {
  flex: 1,
  p: 3,
  flexDirection: 'column',
  alignItems: 'start',
};

const ILLUSTRATION_HEADER_TEXT_SX: SxProps = {
  fontSize: '1.7rem',
  mb: 2,
  fontWeight: 'bold',
};

export const LoginPage = () => (
  <LoginLoadingContext>
    <LoginPageContent />
  </LoginLoadingContext>
);

export const LoginPageContent = () => {
  const { palette, primaryColor, secondaryColor } = usePalette();
  const { view, isLoading } = useLogin();
  const translate = useTranslate();
  const isDarkTheme = useIsDarkTheme();

  return (
    <NoLayout>
      <FlexBox
        sx={{
          bgcolor: palette.background.paper,
          minHeight: '100vh',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'start',
          position: 'relative',
        }}
      >
        <FlexBox sx={{ ...LOGIN_PAGE_SX }}>
          <FlexBox sx={ILLUSTRATION_BOX_SX}>
            <Typography
              sx={{
                ...ILLUSTRATION_HEADER_TEXT_SX,
                color: isDarkTheme ? '#9CC5A1' : '#49A078',
              }}
              variant="h2"
            >
              {translate('ha.login.illustration.header')}
            </Typography>
            <Typography sx={{ fontSize: '15px', color: secondaryColor }}>
              Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </Typography>
            <img
              width={250}
              alt="hackoholics-login"
              src={loginIllustration}
              style={{ display: 'block' }}
            />
            <Typography sx={{ color: secondaryColor, fontSize: '15px' }}>
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
        </FlexBox>
      </FlexBox>
      <Backdrop
        open={isLoading}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </NoLayout>
  );
};
