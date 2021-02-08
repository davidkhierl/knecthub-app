import { useMediaQuery } from '@chakra-ui/react';

const useMediaScreen = () => {
  const [
    baseScreen,
    smallScreen,
    mediumScreen,
    largeScreen,
    wideScreen,
    ultraWideScreen
  ] = useMediaQuery([
    '(min-width: 360px)',
    '(min-width: 640px)',
    '(min-width: 768px)',
    '(min-width: 1024px)',
    '(min-width: 1280px)',
    '(min-width: 1536px)'
  ]);

  return {
    baseScreen,
    smallScreen,
    mediumScreen,
    largeScreen,
    wideScreen,
    ultraWideScreen
  };
};

export default useMediaScreen;
