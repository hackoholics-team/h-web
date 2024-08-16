import { Button, Show, useShowContext, useTranslate } from 'react-admin';
import { CircularProgress, Chip, Box, Typography } from '@mui/material';
import { FlexBox, ProfileLayout } from '@/common/components';
import { Dialog } from '@/common/components';
import { User } from '@/gen/client';
import { useGetConnectedId, usePalette } from '@/common/hooks';
import { useDialogContext } from '@/common/services/dialog';
import { useWhoami } from '@/security/hooks';
import { useAuthenticated } from 'react-admin';
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
  const translate = useTranslate();

  return (
    <Button
      size="small"
      label={translate('ha.words.edit')}
      variant="contained"
      color="primary"
      onClick={openEditDialog}
      sx={{ fontSize: '13px' }}
    />
  );
};

export const ProfileShowContent = () => {
  const { record: user, isLoading } = useShowContext<Required<User>>();
  const getId = useGetConnectedId();
  const { primaryColor } = usePalette();
  const translate = useTranslate();
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
          <Dialog actionHandler={<EditProfileButton />}>
            <div>Hello</div>
          </Dialog>
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
        {translate('ha.words.requirement')}
      </Typography>
      <FlexBox sx={{ justifyContent: 'start', ml: 2, width: '90%', gap: 2 }}>
        {requirements.slice(0, 7).map((requirement) => (
          <Chip key={requirement} label={requirement} variant="filled" />
        ))}
      </FlexBox>
    </>
  );
};
