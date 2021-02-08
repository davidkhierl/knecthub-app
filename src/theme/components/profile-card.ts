import { ComponentStyleConfig } from '@chakra-ui/theme';
import { mode } from '@chakra-ui/theme-tools';

const _default: ComponentStyleConfig = {
  baseStyle: (props) => ({
    minHeight: '200px',
    rounded: 8,
    p: 4,
    boxShadow: 'md',
    border: '1px',
    borderColor: mode('gray.200', 'gray.600')(props)
  })
};

export default _default;
