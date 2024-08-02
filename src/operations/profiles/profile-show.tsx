import { Show, TabbedShowLayout, useShowContext } from 'react-admin';
import { CircularProgress, Box } from '@mui/material';
import { ProfileLayout } from '@/common/components';
import { User } from '@/gen/client';
import { usePalette } from '@/common/hooks';
import { PAPER_BOX_SX } from '@/common/utils/common-props';
// import { useWhoami } from "@/security/hooks"

export const ProfileShow = () => {
  return (
    <Show id="dummyId" resource="profiles">
      <ProfileShowContent />
    </Show>
  );
};

export const ProfileShowContent = () => {
  // const { id } = useWhoami();
  const { record: user, isLoading } = useShowContext<Required<User>>();
  const { bgcolor } = usePalette();

  if (isLoading) {
    return <CircularProgress sx={{ mx: 'auto' }} />;
  }

  return (
    <>
      <ProfileLayout user={user!} />
      <TabbedShowLayout>
        <TabbedShowLayout.Tab
          path=""
          label="Informations"
          sx={{ textTransform: 'none' }}
        >
          <Box sx={{ borderRadius: '15px', bgcolor, p: 5, ...PAPER_BOX_SX }}>
            Hello world
          </Box>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </>
  );
};
