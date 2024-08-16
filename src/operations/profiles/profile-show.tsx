import { Button, Show, TabbedShowLayout, useShowContext } from 'react-admin';
import { CircularProgress, Chip, Box, Typography } from '@mui/material';
import { FlexBox, ProfileLayout } from '@/common/components';
import { Dialog } from '@/common/components';
import { User } from '@/gen/client';
import { useGetConnectedId, usePalette } from '@/common/hooks';
import { useDialogContext } from '@/common/services/dialog';
import { useWhoami } from '@/security/hooks';
import { useAuthenticated } from 'react-admin';
import { PAPER_BOX_SX } from '@/common/utils/common-props';
import { useEffect, useState } from 'react';
import { userApi } from '@/providers/api';
import { NOOP_FN } from '@/common/utils/noop';

export const ProfileShow = () => {
  useAuthenticated();
  const { id } = useWhoami(); // ignored as we use signin to fetch current profile and signin need only the firebaseToken

  return (
    <Show
      id={id!}
      sx={{ 'mt': 0, '& .RaShow-card': { bgcolor: 'transparent' } }}
      resource="profiles"
    >
      <ProfileShowContent />
    </Show>
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
  const getId = useGetConnectedId();
  const { bgcolor, primaryColor } = usePalette();
  const [requirements, setRequirements] = useState<string[]>([]);

  useEffect(() => {
    userApi()
      .getRequirements(getId())
      .then((response) => {
        setRequirements(response.data);
      })
      .catch(NOOP_FN);
  }, [getId()]);

  if (isLoading || !user) {
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
      <Typography
        sx={{
          width: '90%',
          ml: 2,
          fontWeight: 'bold',
          my: 1,
          fontSize: '1rem',
          color: primaryColor,
        }}
      >
        My Requirements
      </Typography>
      <FlexBox sx={{ justifyContent: 'start', ml: 2, width: '90%', gap: 2 }}>
        {requirements.map((requirement) => (
          <Chip key={requirement} label={requirement} variant="filled" />
        ))}
      </FlexBox>
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
