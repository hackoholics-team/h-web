import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import { NoLayoutAppbar } from './appbar';
import { usePalette } from '@/common/hooks';

export const NoLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { bgcolor } = usePalette();

  return (
    <Box sx={{ width: '100%', bgcolor }}>
      <NoLayoutAppbar />
      {children}
    </Box>
  )
}
