import { FC } from 'react';
import { Button } from 'react-admin';
import { SocialIcon } from 'react-social-icons';
import { Box, Typography, Avatar, Badge } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { User } from '@/gen/client';
import { FlexBox } from './box';
import { useIsDarkTheme, usePalette } from '../hooks';
import { PAPER_BOX_SX } from '../utils/common-props';

const Field = ({ label }: { label: string }) => {
  const { primaryColor } = usePalette();
  return (
    <Typography
      sx={{ fontSize: '14px', mb: 1, color: primaryColor, fontWeight: 'bold' }}
    >
      {label}
    </Typography>
  );
};

const FieldValue = ({ value }: { value: string }) => {
  const { secondaryColor } = usePalette();
  return (
    <Typography sx={{ mb: 1, fontSize: '14px', color: secondaryColor }}>
      {value}
    </Typography>
  );
};

export const ProfileLayout: FC<{ user: Required<User> }> = ({ user }) => {
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
            sx={{ width: '120px', height: '120px', border: '2px solid white' }}
          />
        </Badge>
        <Box>
          <Typography
            variant="h2"
            sx={{
              color: primaryColor,
              fontWeight: 'bold',
              fontSize: '1.5rem',
              mb: 1.2,
            }}
          >
            {user.firstName + ' ' + user.lastName}
          </Typography>
          <Typography sx={{ fontSize: '14px', color: secondaryColor }}>
            Web developper on stackoverflow, huh{' '}
          </Typography>
          <Typography
            color="primary"
            sx={{ fontSize: '14px', display: 'inline-flex', alignItems: 'end' }}
          >
            <LocationOn />
            Nanisana, Antananarivo
          </Typography>
          <FlexBox sx={{ gap: 3, mt: 1, justifyContent: 'start' }}>
            <Button
              size="medium"
              label="Contacter"
              variant="contained"
              color="primary"
            />
            <Button
              size="medium"
              label="Editer"
              variant="outlined"
              color="primary"
            />
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
            <Field label="Email" />
            <Field label="Username" />
            <Field label="Birthdate" />
          </Box>
          <Box>
            <FieldValue value={user.email} />
            <FieldValue value={user.username} />
            <FieldValue value={new Date(user.birthDate).toLocaleDateString()} />
          </Box>
        </FlexBox>
        <FlexBox sx={{ gap: 2, justifyContent: 'start', mt: 1 }}>
          <SocialIcon
            style={{ width: '30px', height: '30px' }}
            network="whatsapp"
          />
          <SocialIcon
            style={{ width: '30px', height: '30px' }}
            network="facebook"
          />
          <SocialIcon
            style={{ width: '30px', height: '30px' }}
            network="twitter"
          />
          <SocialIcon
            style={{ width: '30px', height: '30px' }}
            network="linkedin"
          />
          <SocialIcon style={{ width: '30px', height: '30px' }} network="x" />
        </FlexBox>
      </Box>
    </FlexBox>
  );
};