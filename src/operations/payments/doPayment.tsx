import { Typography } from '@mui/material';
import { FlexBox } from '@/common/components';
import { v4 as uuid } from 'uuid';
import { useGetConnectedId, usePalette } from '@/common/hooks';
import {
  minValue,
  number,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetList,
  useNotify,
  useRedirect,
} from 'react-admin';
import { useState } from 'react';
import { payingApi } from '@/providers/api';
import { NOOP_FN } from '@/common/utils/noop';

export const SelectPayment = () => {
  const getId = useGetConnectedId();
  const { data = [], isLoading } = useGetList('paymentMethods', {
    meta: {
      userId: getId(),
    },
  });

  return (
    <SelectInput
      choices={data}
      isLoading={isLoading}
      source="paymentMethodId"
      optionText="brand"
      optionValue="id"
      validate={required()}
      fullWidth
    />
  );
};

export const DoPayment = () => {
  const { bgcolor, primaryColor } = usePalette();
  const [isLoading, setIsLoading] = useState(false);
  const getId = useGetConnectedId();
  const redirect = useRedirect();
  const notify = useNotify();

  if (!getId()) {
    return (window.location.href = '#/login');
  }

  const doPay = async (values: any) => {
    setIsLoading(true);
    payingApi()
      .pay(getId(), values.paymentMethodId, {
        ...values,
        currency: 'EUR',
        creationDatetime: new Date().toISOString(),
        paymentMethodId: values.paymentMethodId,
        id: uuid(),
      })
      .then(() => {
        notify('Success', { type: 'success' });
        redirect('#/payments');
      })
      .catch(NOOP_FN)
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <FlexBox
      sx={{
        flexDirection: 'column',
        p: 3,
        alignItems: 'start',
        width: '100%',
        bgcolor,
        mt: 2,
        borderRadius: '8px',
      }}
    >
      <Typography
        sx={{
          color: primaryColor,
          fontSize: '1.4rem',
          mb: 2,
          fontWeight: 'bold',
        }}
      >
        Do Payment
      </Typography>
      <SimpleForm disabled={isLoading} onSubmit={doPay} sx={{ width: '500px' }}>
        <SelectPayment />
        <TextInput
          required
          fullWidth
          source="amount"
          label="Amount"
          validate={[required(), number(), minValue(1)]}
        />
        <TextInput
          required
          fullWidth
          readOnly
          defaultValue="Euro"
          source="currency"
          label="Currency"
          validate={[required()]}
        />
      </SimpleForm>
    </FlexBox>
  );
};
