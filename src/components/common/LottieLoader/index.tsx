import { useEffect, useRef } from 'react';

import { Box } from '@chakra-ui/react';
import React from 'react';
import lottie from 'lottie-web';

export interface LottieLoaderProps {
  animationData: any;
  className?: string;
  loop?: boolean;
  size?: string | number;
}

const LottieLoader: React.FC<LottieLoaderProps> = (props) => {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: element.current as HTMLDivElement,
      animationData: props.animationData,
      loop: props.loop
    });
  }, [props.animationData, props.loop]);
  return <Box className={props.className} width={props.size} ref={element} />;
};

export default LottieLoader;
