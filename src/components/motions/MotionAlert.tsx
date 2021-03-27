import { Alert, ChakraProps, ComponentWithAs, forwardRef } from '@chakra-ui/react';
import { MotionProps, isValidMotionProp, motion } from 'framer-motion';

import React from 'react';

export type MotionAlertProps = Omit<ChakraProps, keyof MotionProps> &
  MotionProps & {
    as?: React.ElementType;
  };

const MotionAlert = motion(
  forwardRef<MotionAlertProps, typeof Alert>((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Alert ref={ref} {...chakraProps} />;
  })
) as ComponentWithAs<typeof Alert, MotionAlertProps>;

export default MotionAlert;
