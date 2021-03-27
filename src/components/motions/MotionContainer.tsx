import { ChakraProps, ComponentWithAs, forwardRef } from '@chakra-ui/react';
import { MotionProps, isValidMotionProp, motion } from 'framer-motion';

import Container from 'components/common/Container';
import React from 'react';

export type MotionContainerProps = Omit<ChakraProps, keyof MotionProps> &
  MotionProps & {
    as?: React.ElementType;
  };

const MotionContainer = motion(
  forwardRef<MotionContainerProps, typeof Container>((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Container ref={ref} {...chakraProps} />;
  })
) as ComponentWithAs<typeof Container, MotionContainerProps>;

export default MotionContainer;
