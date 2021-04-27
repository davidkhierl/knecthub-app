import { Box, Container } from '@chakra-ui/react';

import React from 'react';

export interface DoublePaneLayoutProps {
  children?: React.ReactNode;
}

const DoublePaneLayout = ({ children }: DoublePaneLayoutProps) => {
  return (
    <Container minH='full' py={8} display='flex' flexDirection='column'>
      <Box m='auto' alignSelf='safe center'>
        {children}
      </Box>
    </Container>
  );
};

export default DoublePaneLayout;
