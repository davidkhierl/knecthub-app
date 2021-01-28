import { Theme, extendTheme } from '@chakra-ui/react';

import ProfileCard from './components/profile-card';
import WebinarCard from './components/webinar-card';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const theme: Theme = extendTheme({
  breakpoints: createBreakpoints({
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }),
  // TODO: Add knecthub colors.
  colors: {},
  components: {
    ProfileCard,
    WebinarCard
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  }
});

export default theme;
