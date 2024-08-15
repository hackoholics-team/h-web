import { TextField } from 'react-admin';
import { List } from '@/common/components/list';
import { TitledPage } from '@/common/components';

export const DummyList = () => {
  return (
    <TitledPage
      title="List of all Dummies"
      description="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim ."
      paths={[
        {
          label: 'dummies',
          href: '/dummies',
        },
      ]}
    >
      <List>
        <TextField source="id" label="Id" />
        <TextField source="name" label="Name" />
      </List>
    </TitledPage>
  );
};
