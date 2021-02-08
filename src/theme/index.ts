import Card from './components/card';
import ProfileCard from './components/profile-card';
import WebinarCard from './components/webinar-card';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  breakpoints: createBreakpoints({
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }),
  // TODO: Add knecthub colors.
  colors: {
    black: '#1C2331',
    gray: {
      50: '#edf1fc',
      100: '#ced5e3',
      200: '#afb9ce',
      300: '#8f9eba',
      400: '#7082a7',
      500: '#56688d',
      600: '#43516f',
      700: '#303a4f',
      800: '#1c2331',
      900: '#050c15'
    }
  },
  components: {
    Card,
    ProfileCard,
    WebinarCard
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  }
});

export default theme;
