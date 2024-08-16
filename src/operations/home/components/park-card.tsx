import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  SxProps,
  Box,
  Divider,
} from '@mui/material';
import { StarBorder, Star } from '@mui/icons-material';
import { useDialogContext } from '@/common/services/dialog';

const CARD_STYLE: SxProps = {
  maxWidth: '49%',
  overflow: 'hidden',
  // maxHeight: '300px',
};

const CARD_CONTENT_STYLE: SxProps = {
  minWidth: '400px',
  maxWidth: '100%',
  padding: 2,
  alignItems: 'center',
};

const CARD_MEDIA_STYLE: SxProps = {
  borderRadius: 1,
  maxHeight: '250px',
  transition: '2s',
};

export type ParkCardProps = {
  name: string;
  desc: string;
  imageSrc: string;
  rating: number;
};

export const ParkCard = ({ name, desc, imageSrc, rating}: ParkCardProps) => {
  const { toggleStatus } = useDialogContext<false>();

  return (
    <Card sx={CARD_STYLE} onClick={toggleStatus}>
      <CardMedia
        sx={{
          ...CARD_MEDIA_STYLE,
        }}
        component={'img'}
        image={imageSrc}
      />
      <Box sx={CARD_CONTENT_STYLE}>
        <CardContent
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              maxWidth: 430,
            }}
          >
            {name}
          </Typography>
          <Typography variant="body2" color={'text.secondary'} marginBottom={1}>
            Emplacement
          </Typography>
          <Divider variant="middle" />
          <Typography variant="body1" marginTop={1}>
            {desc}
          </Typography>
          <Box
            flexWrap={'nowrap'}
            color={'#ebeb4b'}
            sx={{ width: 'max-content' }}
          >
            {Array(5)
              .fill(<StarBorder />)
              .map((el, index) => (index < rating ? <Star key={index} /> : el))}
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};
