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
  forwardRef
} from '@chakra-ui/react';

import { HiOutlineSelector } from 'react-icons/hi';
import React from 'react';
import useAuthStore from '@/store/useAuthStore';

const UserMenu = forwardRef<MenuButtonProps, 'button'>((props, ref) => {
  const user = useAuthStore((state) => state.user);

  const signOut = useAuthStore((state) => state.signOut);

  return (
    <Menu>
      <MenuButton
        as={Button}
        h='unset'
        py={4}
        textAlign='left'
        rightIcon={<HiOutlineSelector />}
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
      <MenuList p={2}>
        <MenuItem rounded='md' onClick={signOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
});

export default UserMenu;
