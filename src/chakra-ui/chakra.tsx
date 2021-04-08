import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react';

import { GetServerSideProps } from 'next';
import React from 'react';
import theme from './theme';

interface ChakraProps {
  cookies?: any;
  children: React.ReactNode;
}

const Chakra = ({ cookies, children }: ChakraProps) => {
  const colorModeManager =
    typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager;

  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      cookies: req.headers.cookie ?? ''
    }
  };
};

export default Chakra;
