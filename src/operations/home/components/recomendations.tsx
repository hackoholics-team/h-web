import { FlexBox } from '@/common/components';
import { LinearProgress } from '@mui/material';
import { SxProps } from '@mui/material';
import { ParkDetail } from './park-detail';
import { PlacesSearchResult } from '@/gen/client';
import { useListContext } from 'react-admin';

const CONTAINER_SX: SxProps = {
  justifyContent: 'start',
  flexWrap: 'wrap',
  gap: 2,
  padding: 2,
  width: '100%',
};

export const RecomendationsList = () => {
  const { data: places = [], isLoading } = useListContext<
    Required<PlacesSearchResult> & { id: string }
  >();

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <FlexBox sx={CONTAINER_SX}>
      {places.map((place) => (
        <ParkDetail key={place.id} place={place} />
      ))}
    </FlexBox>
  );
};
