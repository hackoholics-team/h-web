import { TitledPage } from '@/common/components';

export const Settings = () => {
  return (
    <TitledPage
      title="Settings"
      description="All configurations of the applications"
      paths={[
        {
          label: 'settings',
          href: '/settings',
        },
      ]}
    >
      Nothing yet
    </TitledPage>
  );
};
