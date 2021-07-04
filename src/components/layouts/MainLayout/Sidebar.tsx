import { Box, BoxProps, Button, Flex, forwardRef, useColorMode } from '@chakra-ui/react';
import {
  HiCalendar,
  HiHome,
  HiOutlineSupport,
  HiPlus,
  HiSearch,
  HiStar,
  HiUserGroup
} from 'react-icons/hi';

import { BiCog } from 'react-icons/bi';
import { ImSun } from 'react-icons/im';
import { IoMoon } from 'react-icons/io5';
import KnecthubLogo from '@/components/common/KnecthubLogo';
import Menu from './SidebarMenu';
import MenuItem from './SidebarMenuItem';
import React from 'react';
import UserMenu from '@/components/common/UserMenu';

const Sidebar = forwardRef<BoxProps, 'div'>((props, ref) => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Box as='aside' ref={ref} overflow='auto' {...props}>
      <Flex direction='column' h='full' p={4}>
        <KnecthubLogo flexShrink={0} />
        <UserMenu mt={4} />
        <Box h='full'>
          <Menu mt={8}>
            <MenuItem href='/' leftIcon={<HiHome size={18} />}>
              Home
            </MenuItem>
            <MenuItem href='/connections' leftIcon={<HiUserGroup size={18} />}>
              Connections
            </MenuItem>
            <MenuItem href='/schedules' leftIcon={<HiCalendar size={18} />}>
              Schedules
            </MenuItem>
          </Menu>
          <Menu mt={8} title='Events'>
            <Button colorScheme='green' isFullWidth rightIcon={<HiPlus size={20} />}>
              Create Event
            </Button>
            <MenuItem href='/discover' leftIcon={<HiSearch size={18} />}>
              Discover
            </MenuItem>
            <MenuItem href='/my-events' leftIcon={<HiStar size={18} />}>
              My Events
            </MenuItem>
          </Menu>
        </Box>
        <Menu>
          <MenuItem
            leftIcon={colorMode === 'light' ? <IoMoon size={18} /> : <ImSun size={18} />}
            onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </MenuItem>
          <MenuItem href='/settings' leftIcon={<BiCog size={18} />}>
            Settings
          </MenuItem>
          <MenuItem leftIcon={<HiOutlineSupport size={18} />}>Help &amp; Support</MenuItem>
        </Menu>
      </Flex>
    </Box>
  );
});

export default Sidebar;
