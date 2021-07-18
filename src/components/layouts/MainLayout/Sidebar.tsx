import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  BoxProps,
  Button,
  Flex,
  forwardRef,
} from '@chakra-ui/react';
import {
  HiCalendar,
  HiHome,
  HiPlus,
  HiSearch,
  HiStar,
  HiUserGroup
} from 'react-icons/hi';

import KnecthubLogo from '@/components/common/KnecthubLogo';
import Menu from './SidebarMenu';
import MenuItem from './SidebarMenuItem';
import React from 'react';
import UserMenu from '@/components/common/UserMenu';
import useAuthStore from '@/store/useAuthStore';

const Sidebar = forwardRef<BoxProps, 'div'>((props, ref) => {
  const user = useAuthStore((state) => state.user);

  return (
    <Box as='aside' ref={ref} overflow='auto' {...props}>
      <Flex direction='column' h='full' p={4}>
        <KnecthubLogo flexShrink={0} />
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
        {!user?.emailVerified && (
          <Alert status='warning' my={4} flexShrink={0} rounded='md'>
            <AlertIcon />
            <Box flex='1'>
              <AlertTitle>Unverified Account</AlertTitle>
              <AlertDescription>
                Please check your email or click here to resend verification link.
              </AlertDescription>
            </Box>
          </Alert>
        )}
        <Menu>
          <UserMenu />
        </Menu>
      </Flex>
    </Box>
  );
});

export default Sidebar;
