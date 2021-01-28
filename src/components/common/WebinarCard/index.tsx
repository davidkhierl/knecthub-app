import { Box, BoxProps, forwardRef, useStyleConfig } from '@chakra-ui/react';

import React from 'react';

const WebinarCard = forwardRef<BoxProps, 'div'>((props, ref) => {
  const styles = useStyleConfig('WebinarCard');

  return <Box ref={ref} sx={styles} {...props} />;
});

export default WebinarCard;
