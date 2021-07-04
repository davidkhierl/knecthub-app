import { StackProps, Text, VStack, forwardRef } from '@chakra-ui/react';

import React from 'react';

export interface SidebarMenuProps extends StackProps {
  title?: string;
}

const SidebarMenu = forwardRef<SidebarMenuProps, 'nav'>(({ title, children, ...props }, ref) => {
  return (
    <VStack spacing={2} ref={ref} as='nav' {...props}>
      {title && (
        <Text
          casing='uppercase'
          color='gray.500'
          fontSize='sm'
          fontWeight='medium'
          mb={2}
          mr='auto'
          >
          {title}
        </Text>
      )}
      {children}
    </VStack>
  );
});

export default SidebarMenu;
