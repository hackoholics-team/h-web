import { TitledPage } from '@/common/components';
import { Show, SimpleShowLayout, TextField } from 'react-admin';
import { useParams } from 'react-router-dom';

export const DummyShow = () => {
  const { id } = useParams();

  return (
    <TitledPage
      title={`Dummies ${id}`}
      description="Lorem ipsum dolor sit amet, qui minim labore adipisicing"
      paths={[
        {
          label: 'dummies',
          href: '/dummies',
        },
        {
          label: id!,
          href: `/dummies/${id}/show`,
        },
      ]}
    >
      <Show id={id}>
        <SimpleShowLayout>
          <TextField source="id" label="Id" />
          <TextField source="name" label="Name" />
        </SimpleShowLayout>
      </Show>
    </TitledPage>
  );
};
