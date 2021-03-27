import { ChakraProps, ComponentWithAs, chakra, forwardRef } from '@chakra-ui/react';
import { MotionProps, isValidMotionProp, motion } from 'framer-motion';

import { ReactComponent as NightIcon } from 'assets/svg/night.svg';
import React from 'react';

export type MotionNightIconProps = Omit<ChakraProps, keyof MotionProps> &
  MotionProps & {
    as?: React.ElementType;
  };

const ChakraNightIcon = chakra(NightIcon);

const MotionNightIcon = motion(
  forwardRef<MotionNightIconProps, 'svg'>((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <ChakraNightIcon ref={ref} {...chakraProps} />;
  })
) as ComponentWithAs<'svg', MotionNightIconProps>;

export default MotionNightIcon;
