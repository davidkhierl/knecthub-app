import { Box, Container } from '@chakra-ui/react';

import Link from 'next/link';
import React from 'react';

export interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  console.log('main layout');
  return (
    <Container>
      <Box as='header'>header</Box>
      <Box as='aside'>
        Sidebar
        <ul>
          <li>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href='/connections'>
              <a>Connections</a>
            </Link>
          </li>
          <li>
            <Link href='/settings'>
              <a>Settings</a>
            </Link>
          </li>
        </ul>
      </Box>
      <Box>{children}</Box>
    </Container>
  );
};

export default MainLayout;
