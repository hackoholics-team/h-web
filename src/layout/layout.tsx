import { FC } from 'react';
import { Box, SxProps } from "@mui/material";
import { LayoutProps } from 'react-admin';
import { Menu } from './menu'
import { AppBar } from './appbar'
import { ChatbotDialog } from '@/operations/chatbot';
import { usePalette } from '@/common/hooks';

const MAIN_CONTENT_SX: SxProps = {
  m: 0,
  p: 2,
  ml: {
    xs: 0,
    md: '250px'
  }
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { palette } = usePalette();

  return (
    <>
      <Box
        id="main-content"
        sx={{
          width: '100%',
          minHeight: '100vh',
          bgcolor: palette.background.paper
        }}
      >
        <Menu />
        <AppBar />
        <Box sx={MAIN_CONTENT_SX}>
          {children}
        </Box>
      </Box>
      <ChatbotDialog />
    </>
  );
};
