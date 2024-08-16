import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { List } from 'react-admin';
import { RecomendationsList } from './components/recomendations';

const HOME_STYLE = {
  padding: '3em',
  overflow: 'hidden'
};
export const Home = () => {
  return (
    <Box sx={HOME_STYLE} width={'100%'}>
      <Typography variant="h3" fontWeight={''}>
        Recomended parks for you
      </Typography>
      <List
        exporter={false}
        resource="places"
        queryOptions={{}}
        sx={{
          width: '100%',
        }}
      >
        <RecomendationsList />
      </List>
    </Box>
  );
};
