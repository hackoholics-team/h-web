import { TitledPage } from '@/common/components';
import { List } from '@/common/components/list';
import { useGetConnectedId } from '@/common/hooks';
import { Button, TextField, Toolbar } from 'react-admin';

export const PaymentMethodsList = () => {
  const getId = useGetConnectedId();

  if (!getId()) {
    return (window.location.href = '#/login');
  }

  return (
    <TitledPage title="All of my payement methods" description="" paths={[]}>
      <List
        empty={false}
        resource="paymentMethods"
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
              variant="contained"
              size="small"
            />
          </Toolbar>
        }
      >
        <TextField source="brand" label="Card Type" />
      </List>
    </TitledPage>
  );
};
