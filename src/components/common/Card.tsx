import { Box, BoxProps, forwardRef, useStyleConfig } from '@chakra-ui/react';

import React from 'react';

export type CardProps = BoxProps;

const Card = forwardRef<CardProps, 'div'>((props, ref) => {
  const styles = useStyleConfig('Card');

  return <Box ref={ref} sx={styles} {...props} />;
});

export default Card;
