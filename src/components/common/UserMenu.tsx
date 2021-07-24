import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  Text,
  forwardRef,
  useColorMode
} from '@chakra-ui/react';
import { HiLogout, HiOutlineSupport } from 'react-icons/hi';

import { BiCog } from 'react-icons/bi';
import { HiOutlineSelector } from 'react-icons/hi';
import { ImSun } from 'react-icons/im';
import { IoMoon } from 'react-icons/io5';
import Link from 'next/link';
import React from 'react';
import useAuthStore from '@/store/useAuthStore';

const UserMenu = forwardRef<MenuButtonProps, 'button'>((props, ref) => {
  const user = useAuthStore((state) => state.user);

  const signOut = useAuthStore((state) => state.signOut);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Menu>
      <MenuButton
        as={Button}
        h='unset'
        py={2}
        textAlign='left'
        rightIcon={<HiOutlineSelector />}
        colorScheme='cyan'
        variant='sidebar-menu-item'
        ref={ref}
        {...props}>
        <Flex>
          <Avatar
            bg={user?.profile.avatarBgColor}
            name={user?.firstName}
            src={user?.profile.profilePicture}
            mr={2}
          />
          <Flex direction='column'>
            <Text>{user?.firstName}</Text>
            <Text mt={1} fontSize='sm' fontWeight='normal'>
              {user?.email}
            </Text>
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem
          icon={colorMode === 'light' ? <IoMoon size={18} /> : <ImSun size={18} />}
          onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </MenuItem>
        <Link href='/settings' passHref>
          <MenuItem icon={<BiCog size={18} />}>Settings</MenuItem>
        </Link>
        <MenuItem icon={<HiOutlineSupport size={18} />}>Help &amp; Support</MenuItem>
        <MenuItem icon={<HiLogout size={18} />} onClick={signOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
});

export default UserMenu;
