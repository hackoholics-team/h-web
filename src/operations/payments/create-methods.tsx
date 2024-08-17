import { Typography } from '@mui/material';
import { FlexBox } from '@/common/components';
import { useGetConnectedId, usePalette } from '@/common/hooks';
import {
  maxLength,
  maxValue,
  minLength,
  minValue,
  number,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';
import { useState } from 'react';
import { payingApi } from '@/providers/api';
import { NOOP_FN } from '@/common/utils/noop';

const CARD_TYPES = [
  { id: 'pm_card_visa', name: 'Visa' },
  { id: 'pm_card_visa_debit', name: 'Visa (débit)' },
  { id: 'pm_card_mastercard', name: 'Mastercard' },
  { id: 'pm_card_mastercard_debit', name: 'Mastercard (débit)' },
  { id: 'pm_card_mastercard_prepaid', name: 'Mastercard (prépayée)' },
  { id: 'pm_card_amex', name: 'American Express' },
  { id: 'pm_card_discover', name: 'Discover' },
  { id: 'pm_card_diners', name: 'Diners Club' },
  { id: 'pm_card_jcb', name: 'JCB' },
  { id: 'pm_card_unionpay', name: 'UnionPay' },
];

export const CreateMethods = () => {
  const { bgcolor, primaryColor } = usePalette();
  const [isLoading, setIsLoading] = useState(false);
  const getId = useGetConnectedId();

  if (!getId()) {
    return (window.location.href = '#/login');
  }

  const doCreate = async (values: any) => {
    setIsLoading(true);
    payingApi()
      .crupdatePaymentMethod(getId(), {
        ...values,
        brand: CARD_TYPES.find((el) => el.id === values.id)?.name,
      })
      .then()
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
        Create new Payement methods
      </Typography>
      <SimpleForm
        disabled={isLoading}
        onSubmit={doCreate}
        sx={{ width: '500px' }}
      >
        <SelectInput
          required
          validate={required()}
          choices={CARD_TYPES}
          label="Card Types"
          fullWidth
          source="id"
          optionText="name"
          optionValue="id"
        />
        <FlexBox sx={{ gap: 1 }}>
          <TextInput
            source="number"
            label="Card Number"
            validate={required()}
            fullWidth
            required
          />
          <TextInput
            source="cvc"
            label="Cvc"
            validate={[required(), number(), maxLength(3), minLength(3)]}
            fullWidth
            required
          />
        </FlexBox>
        <FlexBox sx={{ gap: 1 }}>
          <TextInput
            source="exp_month"
            label="Expiration Month"
            fullWidth
            validate={[required(), number(), minValue(1), maxValue(31)]}
          />
          <TextInput
            source="exp_year"
            label="Expiration Year"
            fullWidth
            validate={[required(), number(), minValue(2023)]}
          />
        </FlexBox>
      </SimpleForm>
    </FlexBox>
  );
};
