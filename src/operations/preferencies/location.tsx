import { useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { SimpleForm } from 'react-admin';
import { NOOP_FN } from '@/common/utils/noop';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export const Location = () => {
  const [center] = useState({
    lat: 10.99835602,
    lng: 77.01502627,
  });

  return (
    <SimpleForm
      sx={{
        'mt': 2,
        '& select': {
          ouline: 'none !important',
          borderRadius: '15px !important',
        },
      }}
      toolbar={false}
      onSubmit={NOOP_FN}
    >
      <GooglePlacesAutocomplete
        apiKey={process.env.GOOGLE_MAP_API_KEY!}
        selectProps={{
          placeholder: 'Ex: Antananarivo',
        }}
      />
      <div style={{ height: '500px', width: '500px' }}>
        <APIProvider
          apiKey={process.env.GOOGLE_MAP_API_KEY!}
          onLoad={() => console.log('Maps API has loaded.')}
        >
          <Map
            defaultZoom={13}
            defaultCenter={center}
            onCameraChanged={NOOP_FN}
          >
            Hello
          </Map>
        </APIProvider>
      </div>
    </SimpleForm>
  );
};
