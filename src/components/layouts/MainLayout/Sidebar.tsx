import { Box, BoxProps, Button, Flex, FlexProps, VStack, forwardRef } from '@chakra-ui/react';
import {
  HiCalendar,
  HiHome,
  HiOutlineSelector,
  HiOutlineSupport,
  HiUserGroup
} from 'react-icons/hi';

import { BiCog } from 'react-icons/bi';
import { IoAddOutline } from 'react-icons/io5';
import KnecthubLogo from '@/components/common/KnecthubLogo';
import Link from 'next/link';
import Menu from './SidebarMenu';
import MenuItem from './SidebarMenuItem';
import React from 'react';
import UserMenu from '@/components/common/UserMenu';

const Sidebar = forwardRef<BoxProps, 'div'>((props, ref) => {
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
        </Menu>
        <Menu mt={8} title='Events'>
          <Button colorScheme='green' isFullWidth size='sm' rightIcon={<IoAddOutline />}>
            Create Event
          </Button>
          <MenuItem leftIcon={<HiCalendar />}>Join</MenuItem>
          <MenuItem href='/schedules' leftIcon={<HiCalendar />}>
            Schedules
          </MenuItem>
          <MenuItem href='/my-events' leftIcon={<HiCalendar />}>
            My Events
          </MenuItem>
        </Menu>
        <Menu mt='auto'>
          <MenuItem href='/settings' leftIcon={<BiCog />}>
            Settings
          </MenuItem>
          <MenuItem href='/help' leftIcon={<HiOutlineSupport />}>
            Help &amp; Support
          </MenuItem>
        </Menu>
      </Flex>
    </Box>
  );
});

export default Sidebar;
