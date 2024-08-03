import { FC } from 'react';
import { Layout as RaLayout, LayoutProps } from 'react-admin';
import { Menu } from './menu';
import { AppBar } from './appbar';
import { ChatbotButton } from '@/operations/chatbot';

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <RaLayout appBar={AppBar} menu={Menu}>
        {children}
      </RaLayout>
      <ChatbotButton />
    </>
  );
};
