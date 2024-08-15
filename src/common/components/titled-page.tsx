import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import { Typography, Box } from '@mui/material';
import { FlexBox } from './flex-box';
import { usePalette } from '../hooks';

export type PagePath = {
  label: string;
  href: string;
};

export type TitledPageProps = {
  title: string;
  description: string;
  paths: PagePath[];
  children: ReactNode;
};

export const TitledPage: FC<TitledPageProps> = ({
  title,
  description,
  paths,
  children,
}) => {
  const { palette, primaryColor, secondaryColor, bgcolor } = usePalette();

  return (
    <>
      <FlexBox
        sx={{
          width: '100%',
          p: 2,
          mt: 1,
          bgcolor,
          alignItems: 'start',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            sx={{ fontWeight: 'bold', fontSize: '1rem', color: primaryColor }}
          >
            {title}
          </Typography>
          <Typography sx={{ fontSize: '14px', color: secondaryColor }}>
            {description}
          </Typography>
        </Box>
        <FlexBox
          sx={{
            '& *:hover': {
              color: `${palette.primary.main} !important`,
            },
            '& *': {
              fontSize: '14px',
              transition: 'all linear .5s',
              textDecoration: 'none',
            },
            '& .MuiSvgIcon-root': {
              color: palette.primary.main,
            },
            'justifyContent': 'start',
          }}
        >
          <Link to="/profiles">
            <Home sx={{ fontSize: '21px !important' }} />
          </Link>
          {paths.length > 0 && (
            <>
              {paths.map((path) => (
                <>
                  <span style={{ margin: '0 4px' }}>/</span>
                  <Link
                    key={path.label}
                    to={path.href}
                    style={{ color: primaryColor }}
                  >
                    {path.label}
                  </Link>
                </>
              ))}
            </>
          )}
        </FlexBox>
      </FlexBox>
      {children}
    </>
  );
};
