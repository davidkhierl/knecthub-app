import { Box, BoxProps, forwardRef, useStyleConfig } from '@chakra-ui/react';

import React from 'react';

const Card = forwardRef<BoxProps, 'div'>((props, ref) => {
  const styles = useStyleConfig('Card');

  return <Box ref={ref} sx={styles} {...props} />;
});

export default Card;
