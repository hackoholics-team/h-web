import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { List } from 'react-admin';
import { RecomendationsList } from './components/recomendations';
import { FlexBox } from '@/common/components';
import AutocompletePlaces from 'react-google-places-autocomplete';
import { usePalette } from '@/common/hooks';
import { useState } from 'react';

export const prefixImageUrl = (image: string) => {
  return image + process.env.GOOGLE_MAP_API_KEY;
};

export const Home = () => {
  const [location, setLocation] = useState('Antananarivo, Madagascar');
  const { palette } = usePalette();

  const onLocationChange = ({ label = 'Antananarivo, Madagascar' }: any) => {
    setLocation(label);
  };

  return (
    <Box sx={{ p: 3 }} width={'100%'}>
      <FlexBox sx={{ width: '100%', mb: 2, justifyContent: 'space-between' }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 'bold', fontSize: '1.7rem' }}
        >
          Recomended parks{' '}
          <span style={{ color: palette.primary.main }}>for you</span>
        </Typography>
        <AutocompletePlaces
          apiKey={process.env.GOOGLE_MAP_API_KEY!}
          selectProps={{
            placeholder: 'Ex: Antananarivo',
            onChange: onLocationChange,
          }}
        />
      </FlexBox>
      <List
        exporter={false}
        resource="places"
        queryOptions={{
          meta: {
            location,
          },
        }}
        sx={{
          width: '100%',
        }}
      >
        <RecomendationsList />
      </List>
    </Box>
  );
};
