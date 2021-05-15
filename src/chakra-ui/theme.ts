import { Styles, createBreakpoints, mode } from '@chakra-ui/theme-tools';
import { ThemeConfig, extendTheme } from '@chakra-ui/react';

import Card from './card';

const breakpoints = createBreakpoints({
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
});

const colors = {
  knectBg: '#272D4E',
  gray: {
    50: '#f7fafc',
    100: '#edf2f7',
    200: '#e2e8f0',
    300: '#cbd5e0',
    400: '#7082a7',
    500: '#56688d',
    600: '#43516f',
    700: '#252e41',
    800: '#1c2331',
    900: '#050c15'
  },
  yellow: {
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
  orange: {
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
  cyan: {
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
};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

const styles: Styles = {};

const theme = extendTheme({
  breakpoints,
  colors,
  components: { Card },
  config,
  styles
});

export default theme;
