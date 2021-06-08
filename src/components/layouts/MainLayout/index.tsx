import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

import React from 'react';
import Scrollbars from '@/components/chakra-factory/Scrollbars';
import Sidebar from './Sidebar';

export interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box id='main-layout' height='100vh' overflow='hidden' position='relative'>
      <Flex height='full'>
        <Sidebar />
        <Box as='main' flex={1} p={4}>
          <Box
            rounded='lg'
            p={4}
            h='full'
            bg={useColorModeValue('white', 'gray.700')}
            shadow='lg'
            border={useColorModeValue('1px', 'none')}
            borderColor='gray.50'>
            <Scrollbars>{children}</Scrollbars>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default MainLayout;
