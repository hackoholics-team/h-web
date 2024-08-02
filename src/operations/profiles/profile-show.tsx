import { useGetOne } from 'react-admin';
import { CircularProgress } from '@mui/material';
import { ProfileLayout } from '@/common/components';
import { User } from '@/gen/client';
// import { useWhoami } from "@/security/hooks"

export const ProfileShow = () => {
  // const { id } = useWhoami();
  const { data: user, isLoading } = useGetOne<Required<User>>('profiles', {
    id: 'dummyId',
  });

  if (isLoading) {
    return <CircularProgress sx={{ mx: 'auto' }} />;
  }

  return <ProfileLayout user={user!} />;
};
