import { Button, Show, TabbedShowLayout, useShowContext } from 'react-admin';
import { CircularProgress, Box } from '@mui/material';
import { ProfileLayout, TitledPage } from '@/common/components';
import { Dialog } from '@/common/components';
import { User } from '@/gen/client';
import { usePalette } from '@/common/hooks';
import { useDialogContext } from '@/common/services/dialog';
// import { useWhoami } from '@/security/hooks';
import { PAPER_BOX_SX } from '@/common/utils/common-props';

export const ProfileShow = () => {
  // const { id } = useWhoami(); // ignored as we use signin to fetch current profile and signin need only the firebaseToken

  return (
    <TitledPage
      title="Mon Profil"
      description="Vous trouverez ici tous les informations à propos de vous"
      paths={[{ label: 'profile', href: '/profiles' }]}
    >
      <Show id={'dummyId'} sx={{ mt: 0 }} resource="profiles">
        <ProfileShowContent />
      </Show>
    </TitledPage>
  );
};

const EditProfileButton = () => {
  const { open: openEditDialog } = useDialogContext<false>();
  return (
    <Button
      size="small"
      label="Editer"
      variant="outlined"
      color="primary"
      onClick={openEditDialog}
      sx={{ fontSize: '13px' }}
    />
  );
};

export const ProfileShowContent = () => {
  const { record: user, isLoading } = useShowContext<Required<User>>();
  const { bgcolor } = usePalette();

  if (isLoading) {
    return <CircularProgress sx={{ mx: 'auto' }} />;
  }

  return (
    <>
      <ProfileLayout
        user={user!}
        actions={
          <>
            <Button
              size="small"
              label="Contacter"
              variant="contained"
              color="primary"
              sx={{ fontSize: '13px' }}
            />
            <Dialog actionHandler={<EditProfileButton />}>
              <p>Edit profile</p>
            </Dialog>
          </>
        }
      />
      <TabbedShowLayout>
        <TabbedShowLayout.Tab
          path=""
          label="Informations"
          sx={{ textTransform: 'none' }}
        >
          <Box
            sx={{
              borderRadius: '8px',
              fontSize: '14px',
              bgcolor,
              p: 2,
              ...PAPER_BOX_SX,
            }}
          >
            Hello world
          </Box>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </>
  );
};
