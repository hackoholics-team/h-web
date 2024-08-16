import { FC, useEffect, useState } from 'react';
import { Box, SxProps } from '@mui/material';
import {
  LayoutProps,
  LoadingPage,
  useAuthState,
  useRedirect,
} from 'react-admin';
import { Menu } from './menu';
import { AppBar } from './appbar';
import { useGetConnectedId, usePalette } from '@/common/hooks';
import { userApi } from '@/providers/api';

const MAIN_CONTENT_SX: SxProps = {
  m: 0,
  px: 1,
  ml: {
    xs: 0,
    md: '250px',
  },
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { bgcolorPaper } = usePalette();
  const { isLoading } = useAuthState();
  const [isPrefLoading, setIsPrefLoading] = useState(true);
  const getId = useGetConnectedId();
  const redirect = useRedirect();

  useEffect(() => {
    const shouldRedirects = async () => {
      const requirements = await userApi()
        .getRequirements(getId())
        .then((response) => response.data)
        .finally(() => {
          setIsPrefLoading(false);
        });

      if (requirements.length === 0) {
        redirect('/preferencies');
      }
    };

    if (!isLoading) {
      shouldRedirects();
    }
  }, [isLoading]);

  if (isLoading || isPrefLoading) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99999,
        }}
      >
        {' '}
        <LoadingPage
          loadingPrimary="Chargment"
          loadingSecondary="En crous de chargement"
        />
      </Box>
    );
  }

  return (
    <>
      <Box
        id="main-content"
        sx={{
          width: '100%',
          minHeight: '100vh',
          bgcolor: bgcolorPaper,
        }}
      >
        <Menu />
        <AppBar />
        <Box sx={MAIN_CONTENT_SX}>{children}</Box>
      </Box>
    </>
  );
};
