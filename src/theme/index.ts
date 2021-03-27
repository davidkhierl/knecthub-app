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
      50: '#edf5fc',
      100: '#ced5e3',
      200: '#afb9ce',
      300: '#8f9eba',
      400: '#7082a7',
      500: '#56688d',
      600: '#43516f',
      700: '#303a4f',
      800: '#1c2331',
      900: '#050c15'
    },
    knectYellow: {
      50: '#fff5dd',
      100: '#fce6b2',
      200: '#f9d985',
      300: '#f7cf55',
      400: '#f4b427',
      500: '#db8d10',
      600: '#aa6308',
      700: '#793e03',
      800: '#4a1f00',
      900: '#1a0800'
    },
    knectOrange: {
      50: '#ffeae4',
      100: '#f8c8bc',
      200: '#eda592',
      300: '#e48168',
      400: '#db5f3e',
      500: '#c14524',
      600: '#97351b',
      700: '#6c2512',
      800: '#431508',
      900: '#1d0400'
    },
    knectTeal: {
      50: '#ddf6ff',
      100: '#bce3f1',
      200: '#98d3e4',
      300: '#72c3d8',
      400: '#4db6cb',
      500: '#3495b2',
      600: '#236c8b',
      700: '#144764',
      800: '#01253e',
      900: '#000b1a'
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
