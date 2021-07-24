import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

import React from 'react';
import Sidebar from './Sidebar';

export interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box id='main-layout' height='100vh' overflowY='hidden' overflowX='auto' position='relative'>
      <Flex height='full'>
        <Sidebar maxW='280px' flexShrink={0}/>
        <Box as='main' flex={1} p={4}>
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            border={useColorModeValue('1px', 'none')}
            borderColor='gray.50'
            h='full'
            overflow='auto'
            p={4}
            rounded='lg'
            shadow='lg'>
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default MainLayout;
