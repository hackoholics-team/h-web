import { DateInput, TextField, TextInput } from 'react-admin';
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
      <List
        sx={{ mt: 1 }}
        filters={[
          <DateInput source="debut" label="Begin" alwaysOn />,
          <DateInput source="fin" label="End" alwaysOn />,
          <TextInput source="name" label="Name" />,
        ]}
      >
        <TextField source="id" label="Id" />
        <TextField source="name" label="Name" />
      </List>
    </TitledPage>
  );
};
