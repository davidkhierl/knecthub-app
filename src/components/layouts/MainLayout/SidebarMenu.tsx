import { StackProps, Text, VStack, forwardRef } from '@chakra-ui/react';

import React from 'react';

export interface SidebarMenuProps extends StackProps {
  title?: string;
}

const SidebarMenu = forwardRef<SidebarMenuProps, 'nav'>(({ title, children, ...props }, ref) => {
  return (
    <VStack spacing={1} ref={ref} as='nav' {...props}>
      {title && (
        <Text
          mr='auto'
          mb={2}
          casing='uppercase'
          fontWeight='medium'
          fontSize='sm'
          color='gray.500'>
          {title}
        </Text>
      )}
      {children}
    </VStack>
  );
});

export default SidebarMenu;
