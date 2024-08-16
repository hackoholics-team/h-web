import { Dialog, FlexBox } from '@/common/components';
import {
  Box,
  Paper,
  SxProps,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import { ParkCard } from './park-card';
import { FC } from 'react';
import { ParkMap } from './park-map';
import Carousel from 'react-material-ui-carousel';
import { CloseDialogButton } from './park-detail-close-button';
import { Phone, Pin } from '@mui/icons-material';

const PAPER_STYLE: SxProps = {
  minHeight: '250px',
  minWidth: '250px',
};

export type ParkCardProps = {
  name: string;
  desc: string;
  rating: number;
  imageSrc: string;
  address: string;
  contacts: {
    international: string;
    local: string;
  };
  reason: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

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
      <img src={props.src} title={props.title} alt={''} />
    </Paper>
  );
};

export const ParkDetail: FC<ParkCardProps> = (props) => {
  return (
    <Dialog
      actionHandler={
        <ParkCard
          desc={props.desc}
          name={props.name}
          imageSrc={props.imageSrc}
          rating={props.rating}
        />
      }
      fullScreen
    >
      <Paper sx={PAPER_STYLE}>
        <Box flexDirection={'row'} justifyContent={'space-between'} flexWrap={'nowrap'} >
          <Box height={'100vh'} width={'50%'} sx={{ overflow: 'hidden' }}>
            <AppBar
              sx={{
                height: 50,
                justifyContent: 'center',
              }}
            >
              <Toolbar>
                <CloseDialogButton />
                <Typography
                  variant="h6"
                  component={'div'}
                  noWrap
                  sx={{ maxWidth: '500px' }}
                >
                  {props.name}
                </Typography>
              </Toolbar>
            </AppBar>
            <Box padding={5}>
              <Carousel cycleNavigation>
                <ParkImage src={props.imageSrc} title="" />
                <ParkImage src={props.imageSrc} title="" />
                <ParkImage src={props.imageSrc} title="" />
                <ParkImage src={props.imageSrc} title="" />
                <ParkImage src={props.imageSrc} title="" />
                <ParkImage src={props.imageSrc} title="" />
              </Carousel>
              <Paper sx={{
                padding: 2
              }}>
                <Typography variant={'h4'} noWrap>
                  {props.name}
                </Typography>
                <Typography variant={'body2'} color={'text.secondary'}>
                  {props.address}
                </Typography>
                {props.contacts && (
                  <Typography color={'green'}>
                    {props.contacts.local}
                  </Typography>
                )}
                <Divider variant={'fullWidth'} />
                <Box
                  sx={{
                    marginTop: '5px',
                    overflow: 'auto',
                  }}
                >
                  <Typography variant={'h6'} color={'text.secondary'}>Description</Typography>
                  <Typography>{props.desc}</Typography>
                  <Box sx={{
                    marginTop: '8px',
                    marginBottom: '8px'
                  }}/>
                  <Typography variant={'h6'} color={'text.secondary'}>
                    Why is this recommended to me ?
                  </Typography>
                  <Typography>
                    {props.reason}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
          <Box height={'100vh'} width={'50%'}>
            <ParkMap {...props.coordinates} />
          </Box>
        </Box>
      </Paper>
    </Dialog>
  );
};
