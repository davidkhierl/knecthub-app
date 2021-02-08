import { ComponentStyleConfig } from '@chakra-ui/theme';
import { mode } from '@chakra-ui/theme-tools';

const _default: ComponentStyleConfig = {
  baseStyle: (props) => ({
    height: '200px',
    rounded: 8,
    p: 4,
    boxShadow: 'md',
    border: '1px',
    borderColor: mode('gray.100', 'gray.200')(props)
  })
};

export default _default;
