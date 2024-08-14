import { FC, ReactNode } from 'react';
import { SocialIcon } from 'react-social-icons';
import { Box, Typography, Avatar, Badge } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { User } from '@/gen/client';
import { FlexBox } from './flex-box';
import { useIsDarkTheme, usePalette } from '../hooks';
import { PAPER_BOX_SX } from '../utils/common-props';

const FieldLabel = ({ label }: { label: string }) => {
  const { primaryColor } = usePalette();
  return (
    <Typography
      sx={{ fontSize: '13px', mb: 1, color: primaryColor, fontWeight: 'bold' }}
    >
      {label}
    </Typography>
  );
};

const FieldValue = ({ value }: { value: string }) => {
  const { secondaryColor } = usePalette();
  return (
    <Typography sx={{ mb: 1, fontSize: '13px', color: secondaryColor }}>
      {value}
    </Typography>
  );
};

export const ProfileLayout: FC<{
  user: Required<User>;
  actions: ReactNode;
}> = ({ user, actions }) => {
  const isDarkTheme = useIsDarkTheme();
  const { bgcolor, primaryColor, secondaryColor } = usePalette();

  const borderSeparator = isDarkTheme
    ? '1px solid rgba(255, 255, 255, .2)'
    : '1px solid rgba(0, 0, 0, .1)';

  return (
    <FlexBox
      sx={{
        ...PAPER_BOX_SX,
        mt: 1,
        p: 5,
        width: 'fit-content',
        alignItems: 'stretch',
        gap: 2,
        borderRadius: '15px',
        bgcolor,
      }}
    >
      <FlexBox sx={{ gap: 2, alignItems: 'start', justifyContent: 'start' }}>
        <Badge
          overlap="circular"
          badgeContent=" "
          color="primary"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Avatar
            src={user.photoId}
            alt={user.firstName}
            sx={{ width: '100px', height: '100px', border: '2px solid white' }}
          />
        </Badge>
        <Box>
          <Typography
            variant="h2"
            sx={{
              color: primaryColor,
              fontSize: '1.4rem',
            }}
          >
            {user.firstName + ' ' + user.lastName}
          </Typography>
          <Typography sx={{ fontSize: '13px', color: secondaryColor }}>
            Web developper on stackoverflow, huh{' '}
          </Typography>
          <Typography
            color="primary"
            sx={{ fontSize: '13px', display: 'inline-flex', alignItems: 'end' }}
          >
            <LocationOn />
            Nanisana, Antananarivo
          </Typography>
          <FlexBox sx={{ gap: 3, mt: 1, justifyContent: 'start' }}>
            {actions}
          </FlexBox>
        </Box>
      </FlexBox>
      <Box sx={{ borderLeft: borderSeparator, pl: 2 }}>
        <FlexBox
          sx={{
            gap: 2,
            color: primaryColor,
            justifyContent: 'start',
            alignItems: 'start',
          }}
        >
          <Box>
            <FieldLabel label="Email" />
            <FieldLabel label="Username" />
            <FieldLabel label="Birthdate" />
          </Box>
          <Box>
            <FieldValue value={user.email} />
            <FieldValue value={user.username} />
            <FieldValue value={new Date(user.birthDate).toLocaleDateString()} />
          </Box>
        </FlexBox>
        <FlexBox sx={{ gap: 2, justifyContent: 'start', mt: 1 }}>
          <SocialIcon
            style={{ width: '25px', height: '25px' }}
            network="whatsapp"
          />
          <SocialIcon
            style={{ width: '25px', height: '25px' }}
            network="facebook"
          />
          <SocialIcon
            style={{ width: '25px', height: '25px' }}
            network="twitter"
          />
          <SocialIcon
            style={{ width: '25px', height: '25px' }}
            network="linkedin"
          />
          <SocialIcon style={{ width: '25px', height: '25px' }} network="x" />
        </FlexBox>
      </Box>
    </FlexBox>
  );
};
