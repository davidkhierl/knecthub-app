import { ComponentStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const _default: ComponentStyleConfig = {
  baseStyle: (props) => ({
    rounded: 12,
    p: 4,
    boxShadow: 'lg',
    border: '1px',
    borderColor: mode('gray.50', 'gray.700')(props),
    bg: mode('white', 'gray.700')(props)
  })
};

export default _default;
