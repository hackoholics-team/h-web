import { FC, useEffect, useState } from 'react';
import { Box, SxProps, Dialog, DialogContent } from '@mui/material';
import {
  LayoutProps,
  LoadingPage,
  useAuthState,
  useRedirect,
} from 'react-admin';
import { Menu } from './menu';
import { AppBar } from './appbar';
import { useGetConnectedId, usePalette } from '@/common/hooks';
import { payingApi, userApi } from '@/providers/api';
import {
  DialogContextProvider,
  useDialogContext,
} from '@/common/services/dialog';
import { PaymentDialog } from '@/operations/payments/payment-dialog';

const MAIN_CONTENT_SX: SxProps = {
  m: 0,
  px: 1,
  ml: {
    xs: 0,
    md: '250px',
  },
};

export const Layout: FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <DialogContextProvider popover={false}>
      <LayoutContent {...props}>{children}</LayoutContent>
    </DialogContextProvider>
  );
};

export const LayoutContent: FC<LayoutProps> = ({ children }) => {
  const { status, toggleStatus } = useDialogContext<false>();
  const { bgcolorPaper } = usePalette();
  const { isLoading } = useAuthState();
  const [isPrefLoading, setIsPrefLoading] = useState(true);
  const [isPayemenntMethodLoading, setIsPayemenntMethodLoading] =
    useState(false);
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

  useEffect(() => {
    const shouldRedirects = async () => {
      const requirements = await payingApi()
        .getPaymentMethods(getId())
        .then((response) => response.data)
        .finally(() => {
          setIsPayemenntMethodLoading(false);
        });

      if (requirements.length === 0) {
        toggleStatus();
      }
    };

    if (!isPrefLoading) {
      shouldRedirects();
    }
  }, [isPrefLoading]);

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
      <Dialog fullWidth maxWidth="md" open={status} onClose={toggleStatus}>
        <DialogContent sx={{ p: 3 }}>
          <PaymentDialog />
        </DialogContent>
      </Dialog>
    </>
  );
};
