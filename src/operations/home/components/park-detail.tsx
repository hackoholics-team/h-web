import { Dialog, FlexBox } from '@/common/components';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  DialogContent,
  Divider,
} from '@mui/material';
import { ParkCard } from './park-card';
import { FC } from 'react';
import { ParkMap } from './park-map';
import { CloseDialogButton } from './park-detail-close-button';
import { PlaceDetails, PlacesSearchResult } from '@/gen/client';
import Carousel from 'react-material-ui-carousel';
import { useGetOne, useTranslate } from 'react-admin';
import { prefixImageUrl } from '..';

type ParkImageProps = {
  src: string;
  title: string;
};

const ParkImage = (props: ParkImageProps) => {
  return (
    <Paper
      sx={{
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <img
        src={prefixImageUrl(props.src)}
        style={{ width: '400px', height: '300px', display: 'block' }}
        title={props.title}
        alt={''}
      />
    </Paper>
  );
};

export const ParkDetailContent = ({ placeId }: { placeId: string }) => {
  const { data: placeAbout, isLoading } = useGetOne<
    Required<PlaceDetails> & { id: string }
  >('places', { id: placeId });
  const translate = useTranslate();
  if (isLoading || !placeAbout) {
    return (
      <FlexBox sx={{ p: 5 }}>
        {' '}
        <CircularProgress />
      </FlexBox>
    );
  }

  return (
    <DialogContent sx={{ p: 0 }}>
      <Paper sx={{ position: 'relative' }}>
        <CloseDialogButton />
        <FlexBox sx={{ width: '98%', alignItems: 'start' }}>
          <Box width={'50%'} sx={{ overflow: 'hidden' }}>
            <Box padding={5}>
              <Box sx={{ width: '100%', minHeight: '250px' }}>
                <Carousel cycleNavigation>
                  {placeAbout.photos.map((photo, index) => (
                    <ParkImage
                      key={photo}
                      src={photo}
                      title={`${placeAbout} ${index}`}
                    />
                  ))}
                </Carousel>
              </Box>
              <Paper sx={{ p: 2 }}>
                <Typography variant={'h4'} noWrap>
                  {placeAbout.name}
                </Typography>
                <Typography variant={'body2'} color={'text.secondary'}>
                  {placeAbout.address}
                </Typography>
                {placeAbout.localPhone && (
                  <Typography color={'green'}>
                    {placeAbout.localPhone}
                  </Typography>
                )}
                <Divider variant={'fullWidth'} />
                <Box
                  sx={{
                    marginTop: '5px',
                    overflow: 'auto',
                  }}
                >
                  <Typography variant={'h6'} color={'text.secondary'}>
                    Description
                  </Typography>
                  <Typography>{placeAbout.overview}</Typography>
                  <Box
                    sx={{
                      marginTop: '8px',
                      marginBottom: '8px',
                    }}
                  />
                  <Typography variant={'h6'} color={'text.secondary'}>
                    {translate('ha.text.recommendedQuestion')}
                  </Typography>
                  <Typography>{placeAbout.reason}</Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
          <Box height={'450px'} sx={{ mt: 7, flex: 1 }}>
            <ParkMap geometry={placeAbout.geometry} />
          </Box>
        </FlexBox>
      </Paper>
    </DialogContent>
  );
};

export const ParkDetail: FC<{
  place: Required<PlacesSearchResult> & { id: string };
  isFavorite: boolean;
}> = ({ place, isFavorite }) => {
  return (
    <Dialog
      actionHandler={
        <ParkCard
          name={place.name}
          imageSrc={place.photo}
          rating={place.rating}
          placeId={place.placeId}
          address={place.address}
          isFavorite={isFavorite}
        />
      }
      fullWidth
      maxWidth="lg"
    >
      <ParkDetailContent placeId={place.id} />
    </Dialog>
  );
};
