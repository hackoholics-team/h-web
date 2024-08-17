import { Button, Show, useShowContext, useTranslate } from 'react-admin';
import {
  CircularProgress,
  DialogContent,
  Chip,
  Typography,
} from '@mui/material';
import { FlexBox, ProfileLayout } from '@/common/components';
import { Dialog } from '@/common/components';
import { User } from '@/gen/client';
import { useGetConnectedId, usePalette } from '@/common/hooks';
import { useWhoami } from '@/security/hooks';
import { useAuthenticated } from 'react-admin';
import { useEffect, useState } from 'react';
import { userApi } from '@/providers/api';
import { NOOP_FN } from '@/common/utils/noop';
import { useDialogContext } from '@/common/services/dialog';

export const ProfileShow = () => {
  useAuthenticated();
  const { id } = useWhoami(); // ignored as we use signin to fetch current profile and signin need only the firebaseToken

  if (!id) {
    return (window.location.href = '#/login');
  }

  return (
    <Show
      id={id}
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

// const UploadPictureButton = () => {
//   const {status,  }= useToggle();
//   const getId = useGetConnectedId();
//   const notify = useNotify();
//   const isLarge = useMediaQuery("(min-width:1700px)");
//   return (
//     <div>
//       <IconButton
//         data-testid="upload-picture-button"
//         onClick={toggle}
//         sx={{
//           borderRadius: "50%",
//           transform: isLarge
//             ? "translate(-35px, -35px)"
//             : "translate(-30px, -25px)",
//           bgcolor: PALETTE_COLORS.grey,
//           height: 30,
//           width: 30,
//         }}
//       >
//         <PhotoCamera
//           sx={{ height: 20, width: 20, color: PALETTE_COLORS.yellow }}
//         />
//       </IconButton>
//       <Dialog open={isOpen} onClose={toggle}>
//         <DialogTitle color={PALETTE_COLORS.yellow} fontWeight="bold">
//           Modifier la photo de profil
//         </DialogTitle>
//         <Create
//           title=" "
//           redirect={false}
//           resource="profile-picture"
//           transform={(user) => ({
//             rawFile: user?.profile_picture?.rawFile,
//             id,
//             role,
//           })}
//           mutationOptions={{
//             onSuccess: (user) => {
//               toggle();
//               onUpload(user);
//               notify(`Photo mise à jour avec succès!`, {
//                 type: "success",
//               });
//             },
//           }}
//         >
//           <SimpleForm>
//             <ImageInput
//               source="profile_picture"
//               label=" "
//               accept="image/jpeg,image/png,image/webp"
//             >
//               <ImageField source="src" title="title" />
//             </ImageInput>
//           </SimpleForm>
//         </Create>
//       </Dialog>
//     </div>
//   );
// };

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
            <DialogContent sx={{ p: 5 }}>{/* < */}</DialogContent>
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
