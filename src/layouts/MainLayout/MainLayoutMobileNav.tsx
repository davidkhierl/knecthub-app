import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Switch,
  Text,
  VStack,
  forwardRef,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react';
import { faChevronRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { AnimatePresence } from 'framer-motion';
import Card from 'components/common/Card';
import Container from 'components/common/Container';
import { FontAwesomeIcon } from 'components/chakra-factory';
import MotionCloudIcon from 'components/common/Motions/MotionCloudIcon';
import MotionNightIcon from 'components/common/Motions/MotionNightIcon';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { revokeAuth } from 'redux/authSlice';
import { useDispatch } from 'react-redux';
import useUserStore from 'store/useUserStore';

const MainLayoutMobileNav = forwardRef<BoxProps, 'nav'>((props, ref) => {
  const user = useUserStore((state) => state.user);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();

  const dispatch = useDispatch();

  return (
    <>
      <Box as='nav' ref={ref} {...props}>
        <Avatar
          as={Button}
          name={user?.fullName}
          onClick={onOpen}
          bg={user?.profile.avatarBgColor}
        />
      </Box>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='full'>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <Container h='full' mt={12}>
              <VStack spacing={4} alignItems='stretch'>
                <Card display='flex' as={RouterLink} to='/profile/me' onClick={onClose}>
                  <Avatar name={user?.fullName} bg={user?.profile.avatarBgColor} mr={4} />
                  <Box>
                    <Text fontSize={['md', 'lg', '2xl']} fontWeight='medium'>
                      {user?.fullName}
                    </Text>
                    <Text fontSize={['sm', 'md']}>{user?.profile.jobTitle}</Text>
                  </Box>
                  <FontAwesomeIcon ml='auto' alignSelf='center' icon={faChevronRight} />
                </Card>
                <Card display='flex' as={RouterLink} to='/settings/account' onClick={onClose}>
                  <Box>
                    <Text fontSize={['md', 'lg', '2xl']} fontWeight='medium' alignSelf='center'>
                      Account Settings
                    </Text>
                  </Box>
                  <FontAwesomeIcon ml='auto' alignSelf='center' icon={faChevronRight} />
                </Card>
                <Card display='flex'>
                  <AnimatePresence exitBeforeEnter initial={false}>
                    {colorMode === 'light' && (
                      <MotionCloudIcon
                        key='light'
                        h='48px'
                        w='48px'
                        mr={4}
                        initial={{ opacity: 1, rotate: 0 }}
                        animate={{ opacity: 1, rotate: 360 }}
                        exit={{ opacity: 1, rotate: 330 }}
                      />
                    )}
                    {colorMode === 'dark' && (
                      <MotionNightIcon
                        key='dark'
                        h='48px'
                        w='48px'
                        mr={4}
                        initial={{ opacity: 1, rotate: 0 }}
                        animate={{ opacity: 1, rotate: 360 }}
                        exit={{ opacity: 1, rotate: 330 }}
                      />
                    )}
                  </AnimatePresence>
                  <Text
                    fontSize={['md', 'lg', '2xl']}
                    fontWeight='medium'
                    alignSelf='center'
                    textTransform='capitalize'>
                    {colorMode} Mode
                  </Text>
                  <Switch
                    size='lg'
                    ml='auto'
                    alignSelf='center'
                    onChange={toggleColorMode}
                    isChecked={colorMode === 'dark'}
                  />
                </Card>
                <Card
                  display='flex'
                  as={Button}
                  to='/settings/account'
                  onClick={() => dispatch(revokeAuth())}
                  h='61px'>
                  <Box>
                    <Text fontSize={['md', 'lg', '2xl']} fontWeight='medium' alignSelf='center'>
                      Logout
                    </Text>
                  </Box>
                  <FontAwesomeIcon ml='auto' alignSelf='center' icon={faSignOutAlt} />
                </Card>
              </VStack>
            </Container>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
});

export default MainLayoutMobileNav;
