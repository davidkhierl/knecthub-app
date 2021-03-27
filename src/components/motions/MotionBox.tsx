import { Box, ChakraProps, ComponentWithAs, forwardRef } from '@chakra-ui/react';
import { MotionProps, isValidMotionProp, motion } from 'framer-motion';

import React from 'react';

export type MotionBoxProps = Omit<ChakraProps, keyof MotionProps> &
  MotionProps & {
    as?: React.ElementType;
  };

const MotionBox = motion(
  forwardRef<MotionBoxProps, typeof Box>((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Box ref={ref} {...chakraProps} />;
  })
) as ComponentWithAs<typeof Box, MotionBoxProps>;

export default MotionBox;
