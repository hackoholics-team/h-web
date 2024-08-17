import { Button, TextField, Toolbar } from 'react-admin';
import { List } from '@/common/components/list';
import { useGetConnectedId } from '@/common/hooks';

export const PaymentMethodsList = () => {
  const getId = useGetConnectedId();

  if (!getId()) {
    return (window.location.href = '#/login');
  }

  return (
    <List
      empty={false}
      resource="paymentMethods"
      datagridProps={{
        rowClick: (id) => `/payments/${id}/submit`,
      }}
      queryOptions={{
        meta: {
          userId: getId(),
        },
      }}
      actions={
        <Toolbar>
          <Button
            href="#/payments/methods"
            label="Create"
            variant="outlined"
            size="small"
          />
          <Button
            href="#/pays"
            label="Do Payment"
            variant="contained"
            size="small"
            sx={{ ml: 2 }}
          />
        </Toolbar>
      }
    >
      <TextField source="brand" label="Card Type" />
    </List>
  );
};
