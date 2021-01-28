import { Box, Center, Flex, Heading, useColorModeValue } from '@chakra-ui/react';

import KnecthubLogo from 'components/common/KnecthubLogo';
import React from 'react';

export interface DefaultLayoutProps {
  sidePanelBg?: string;
  tagLine?: string;
  artwork?: React.ReactElement;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ sidePanelBg = '#a6dcef', ...props }) => {
  const bg = useColorModeValue(sidePanelBg, 'gray.700');
  return (
    <Flex h='100%'>
      <Flex
        overflow='hidden'
        d={{ base: 'none', md: 'flex' }}
        w={{ base: '320px', lg: '500px' }}
        bg={bg}
        shrink={0}
        flexDirection='column'>
        <Box p={6}>
          <KnecthubLogo to='/' />
          <Heading>{props.tagLine}</Heading>
        </Box>
        <Center h='100%'>{props.artwork}</Center>
      </Flex>
      <Box w='100%' overflowY='auto'>
        {props.children}
      </Box>
    </Flex>
  );
};

export default DefaultLayout;
