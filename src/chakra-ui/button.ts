import { mode, transparentize } from '@chakra-ui/theme-tools';

import { ComponentStyleConfig } from '@chakra-ui/react';

const variantSidebarMenuItem = (props: Dict) => {
  const { colorScheme, theme } = props;

  if (colorScheme === 'gray') {
    return {
      color: mode(`inherit`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.100`, `whiteAlpha.200`)(props)
      },
      _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) }
    };
  }

  const darkHoverBg = transparentize(`${colorScheme}.200`, 0.12)(theme);

  const darkActiveBg = transparentize(`${colorScheme}.200`, 0.24)(theme);

  return {
    color: mode(`${colorScheme}.600`, `${colorScheme}.200`)(props),
    bg: 'transparent',
    _hover: {
      bg: mode(`${colorScheme}.50`, darkHoverBg)(props)
    },
    _active: {
      bg: mode(`${colorScheme}.50`, darkActiveBg)(props)
    }
  };
};

// Override chakra default button.
const _default: ComponentStyleConfig = {
  variants: {
    'sidebar-menu-item': variantSidebarMenuItem
  }
};

export default _default;
