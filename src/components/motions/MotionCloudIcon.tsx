import { ChakraProps, ComponentWithAs, chakra, forwardRef } from '@chakra-ui/react';
import { MotionProps, isValidMotionProp, motion } from 'framer-motion';

import { ReactComponent as CloudIcon } from 'assets/svg/cloud.svg';
import React from 'react';

export type MotionCloudIconProps = Omit<ChakraProps, keyof MotionProps> &
  MotionProps & {
    as?: React.ElementType;
  };

const ChakraCloudIcon = chakra(CloudIcon);

const MotionCloudIcon = motion(
  forwardRef<MotionCloudIconProps, 'svg'>((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <ChakraCloudIcon ref={ref} {...chakraProps} />;
  })
) as ComponentWithAs<'svg', MotionCloudIconProps>;

export default MotionCloudIcon;
