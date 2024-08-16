import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Box, Typography } from '@mui/material';
import { FlexBox } from '@/common/components';

export type ParkMapProps = {
  lat: number;
  lng: number;
};

export const ParkMap = (props: ParkMapProps) => {
  return (
    <>
      {props.lat && props.lng ? (
        <APIProvider
          apiKey={process.env.GOOGLE_MAP_API_KEY!}
          onLoad={() => console.log('loaded credentials')}
        >
          <Map
            defaultZoom={13}
            defaultCenter={{ ...props }}
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
