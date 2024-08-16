import { FlexBox } from '@/common/components';
import { useListContext } from 'react-admin';
import {
  Card,
  Grid,
  Typography,
  CardContent,
  CardMedia,
} from '@mui/material';
import { SxProps } from '@mui/material';
import { usePalette } from '@/common/hooks';
import { ParkCard } from './park-card';
import { wrap } from 'module';
import { ParkDetail } from './park-detail';
import { log } from 'console';

const CONTAINER_SX: SxProps = {
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  gap: 2,
  padding: 4,
  width: '100%'
}

export const RecomendationsList = () => {
  const { data, isLoading } = useListContext();
  console.log(data);
  return (
    <FlexBox sx={CONTAINER_SX}>
      <ParkDetail 
        
        name='Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa aliquam molestiae incidunt excepturi fugit praesentium quia dolores, necessitatibus libero temporibus rerum hic omnis cumque assumenda est sunt, officiis, eum ullam!' 
        desc={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa aliquam molestiae incidunt excepturi fugit praesentium quia dolores, necessitatibus libero temporibus rerum hic omnis cumque assumenda est sunt, officiis, eum ullam!'} 
        imageSrc='https://picsum.photos/200/300' 
        rating={2}
      />
    </FlexBox>
  );
};
