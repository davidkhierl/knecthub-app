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
    <Box as='aside' ref={ref} {...props}>
      <Flex direction='column' h='full' p={4}>
        <KnecthubLogo />
        <UserMenu mt={4} />
        <Menu mt={8}>
          <MenuItem href='/' leftIcon={<HiHome />}>
            Home
          </MenuItem>
          <MenuItem href='/connections' leftIcon={<HiUserGroup />}>
            Connections
          </MenuItem>
          <MenuItem href='/schedules' leftIcon={<HiCalendar />}>
            Schedules
          </MenuItem>
        </Menu>
        <Menu mt={8} title='Events'>
          <Button colorScheme='green' isFullWidth rightIcon={<HiPlus />}>
            Create Event
          </Button>
          <MenuItem href='/discover' leftIcon={<HiSearch />}>
            Discover
          </MenuItem>
          <MenuItem href='/my-events' leftIcon={<HiStar />}>
            My Events
          </MenuItem>
        </Menu>
        <Menu mt='auto'>
          <MenuItem
            leftIcon={colorMode === 'light' ? <IoMoon /> : <ImSun />}
            onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </MenuItem>
          <MenuItem href='/settings' leftIcon={<BiCog />}>
            Settings
          </MenuItem>
          <MenuItem leftIcon={<HiOutlineSupport />}>Help &amp; Support</MenuItem>
        </Menu>
      </Flex>
    </Box>
  );
});

export default Sidebar;
