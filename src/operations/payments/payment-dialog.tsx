import { Typography, Box } from '@mui/material';
import { FlexBox } from '@/common/components';
import { useGetConnectedId, usePalette } from '@/common/hooks';
import { v4 as uuid } from 'uuid';
import { Close } from '@mui/icons-material';
import { Card } from './card';
import { IconButtonWithTooltip, useRedirect } from 'react-admin';
import { useDialogContext } from '@/common/services/dialog';
import { subscribeApi } from '@/providers/api';
import { NOOP_FN } from '@/common/utils/noop';
import { useState } from 'react';

export const PaymentDialog = () => {
  const { primaryColor, secondaryColor, palette } = usePalette();
  const getId = useGetConnectedId();
  const { toggleStatus } = useDialogContext<false>();
  const [isLoading, setIsLoading] = useState(false);
  const redirect = useRedirect();

  const doSubscription = async () => {
    setIsLoading(true);
    await subscribeApi()
      .crupdateSubscription(getId(), {
        id: uuid(),
        creationDatetime: new Date().toISOString(),
        subscribeType: 'PREMIUM',
      })
      .then(() => {
        redirect('/payments/methods');
      })
      .catch(NOOP_FN)
      .finally(() => {
        setIsLoading(false);
        toggleStatus();
      });
  };

  return (
    <Box>
      <FlexBox sx={{ alignItems: 'start', justifyContent: 'space-between' }}>
        <Box>
          <Typography
            sx={{ fontWeight: 'bold', color: primaryColor, fontSize: '1.4rem' }}
          >
            Select plan that{' '}
            <span style={{ color: palette.primary.main }}>help's grow</span>
          </Typography>
          <Typography sx={{ color: secondaryColor, fontSize: '14px' }}>
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          </Typography>
        </Box>
        <IconButtonWithTooltip label="Close" onClick={toggleStatus}>
          <Close />
        </IconButtonWithTooltip>
      </FlexBox>
      <FlexBox sx={{ width: '100%', mt: 2, gap: 2, alignItems: 'stretch' }}>
        <Card
          disabled
          title="Free Tier"
          description="Free plan with limited features. Enjoy a no-cost option for basic usage."
          features={['Limited requests per month', 'Free for life']}
          isLoading={isLoading}
          price="0$"
        />
        <Card
          title="Premium"
          disabled={false}
          isLoading={isLoading}
          onClick={doSubscription}
          description="Premium plan with extended features. Benefit from dedicated support and full access to all services."
          features={[
            'Unlimited requests per month',
            'Free support',
            'Access to all regions',
          ]}
          price="5$"
        />
      </FlexBox>
    </Box>
  );
};
