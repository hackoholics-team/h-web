import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Typography } from '@mui/material';
import { FlexBox } from '@/common/components';
import { PlaceDetails } from '@/gen/client';

export const ParkMap = ({ geometry }: Pick<PlaceDetails, 'geometry'>) => {
  return (
    <>
      {geometry?.lat && geometry?.lon ? (
        <APIProvider
          apiKey={process.env.GOOGLE_MAP_API_KEY!}
          onLoad={() => console.log('loaded credentials')}
        >
          <Map
            defaultZoom={13}
            defaultCenter={{
              lat: geometry.lat,
              lng: geometry.lon,
            }}
          />
        </APIProvider>
      ) : (
        <NoLocation />
      )}
    </>
  );
};

const NoLocation = () => {
  return (
    <FlexBox>
      <Typography variant="h3">No location preview available</Typography>
    </FlexBox>
  );
};
