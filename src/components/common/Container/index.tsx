import { BoxProps, Flex, forwardRef } from '@chakra-ui/react';

import React from 'react';

type ContainerProps = BoxProps;

const Container = forwardRef<ContainerProps, 'div'>((props, ref) => (
  <Flex ref={ref} flexDirection='column' maxW={1680} w='100%' mx='auto' px={4} {...props} />
));

export default Container;
