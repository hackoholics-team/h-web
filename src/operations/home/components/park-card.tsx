import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  SxProps,
  Box,
  Divider,
  IconButton,
} from '@mui/material';
import { StarBorder, Star, Favorite } from '@mui/icons-material';
import { useDialogContext } from '@/common/services/dialog';
import { prefixImageUrl } from '..';

const CARD_STYLE: SxProps = {
  maxWidth: '50%',
  overflow: 'hidden',
};

const CARD_CONTENT_STYLE: SxProps = {
  minWidth: '400px',
  maxWidth: '100%',
  padding: 2,
  alignItems: 'center',
};

const CARD_MEDIA_STYLE: SxProps = {
  borderRadius: 1,
  width: 'calc(100% - 15px)',
  mx: 'auto',
  height: '250px',
  transition: '2s',
};

export type ParkCardProps = {
  name: string;
  imageSrc: string;
  rating: number;
  placeId: string;
  address: string;
  isFavorite: boolean;
};

export const ParkCard = ({
  name,
  imageSrc,
  rating,
  address,
  isFavorite,
}: ParkCardProps) => {
  const { toggleStatus } = useDialogContext<false>();

  return (
    <Card sx={CARD_STYLE} onClick={toggleStatus}>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <CardMedia
          component={'img'}
          sx={CARD_MEDIA_STYLE}
          image={prefixImageUrl(imageSrc)}
        />
        <IconButton
          sx={{
            position: 'absolute',
            zIndex: 9999,
            bottom: 0,
            left: 5,
          }}
        >
          {isFavorite ? <Favorite /> : <></>}
        </IconButton>
      </Box>
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
            Emplacement : {address}
          </Typography>
          <Divider variant="middle" />
          <Box
            flexWrap={'nowrap'}
            color={'#ebeb4b'}
            sx={{ width: 'max-content' }}
          >
            {Array(5)
              .fill(0)
              .map((_el, index) =>
                index < rating ? (
                  <Star key={index} />
                ) : (
                  <StarBorder key={index} />
                )
              )}
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};
