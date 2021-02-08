import LottieLoader, { LottieLoaderProps } from '../LottieLoader';

import { Center } from '@chakra-ui/react';
import KnecthubSpinnerAnimationData from 'assets/animations/knecthub-spinner.json';
import React from 'react';

const KnecthubSpinner: React.VFC<Omit<Partial<LottieLoaderProps>, 'animationData'>> = ({
  size = 32,
  ...props
}) => {
  return (
    <Center flexGrow={1} h='100%'>
      <LottieLoader {...props} animationData={KnecthubSpinnerAnimationData} size={size} />
    </Center>
  );
};

export default KnecthubSpinner;
