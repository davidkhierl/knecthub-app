import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  StackProps,
  Text,
  Tooltip,
  VStack,
  forwardRef
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  faAngleDown,
  faChevronRight,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

import { AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from 'components/chakra-factory';
import MotionCloudIcon from 'components/common/Motions/MotionCloudIcon';
import MotionNightIcon from 'components/common/Motions/MotionNightIcon';
import NavLinkRouter from 'components/common/NavLinkRouter';
import { Link as RouterLink } from 'react-router-dom';
import { revokeAuth } from 'redux/authSlice';
import { useColorMode } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import useUserStore from 'store/useUserStore';

const MainLayoutNav = forwardRef<StackProps, 'nav'>((props, ref) => {
  const user = useUserStore((state) => state.user);

  const { colorMode, toggleColorMode } = useColorMode();

  const [colorModeSwitch, setColoModeSwitch] = useState(colorMode);

  const dispatch = useDispatch();

  return (
    <HStack as='nav' spacing={4} ref={ref} {...props}>
      <NavLinkRouter to='/' tooltipLabel='Home' rounded={12}>
        Home
      </NavLinkRouter>
      <NavLinkRouter to='/profile/me' tooltipLabel={user?.fullName} rounded={12}>
        <Avatar size='sm' name={user?.fullName} bg={user?.profile.avatarBgColor} mr={2} />
        {user?.fullName}
      </NavLinkRouter>
      <Tooltip label={`Toggle ${colorMode}`} hasArrow arrowSize={6} borderRadius='6px'>
        <Button
          h='40px'
          w='40px'
          variant='ghost'
          display='flex'
          justifyContent='center'
          alignItems='center'
          p={0}
          onClick={() => setColoModeSwitch(colorMode === 'light' ? 'dark' : 'light')}
          rounded={12}>
          <AnimatePresence exitBeforeEnter initial={false} onExitComplete={toggleColorMode}>
            {colorModeSwitch === 'light' && (
              <MotionCloudIcon
                key='light'
                h='26px'
                w='26px'
                initial={{ opacity: 1, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 1, rotate: 330 }}
              />
            )}
            {colorModeSwitch === 'dark' && (
              <MotionNightIcon
                key='dark'
                h='26px'
                w='26px'
                initial={{ opacity: 1, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 1, rotate: 330 }}
              />
            )}
          </AnimatePresence>
        </Button>
      </Tooltip>
      <Box>
        <Menu autoSelect={false}>
          <Tooltip label='Account' hasArrow arrowSize={6} borderRadius='6px'>
            <MenuButton
              as={IconButton}
              icon={<FontAwesomeIcon icon={faAngleDown} />}
              variant='ghost'
              rounded={12}
            />
          </Tooltip>
          <MenuList px={4} rounded={12} w='380px'>
            <VStack spacing={2} alignItems='stretch'>
              <MenuItem
                as={RouterLink}
                to='/profile/me'
                rounded={12}
                p={4}
                fontWeight='medium'
                boxShadow='md'>
                <Avatar name={user?.fullName} bg={user?.profile.avatarBgColor} mr={4} />
                <Box>
                  <Text fontWeight='medium'>{user?.fullName}</Text>
                  <Text>{user?.profile.jobTitle}</Text>
                </Box>
                <FontAwesomeIcon ml='auto' alignSelf='center' icon={faChevronRight} />
              </MenuItem>
              <MenuItem
                as={RouterLink}
                to='/settings/account'
                icon={<FontAwesomeIcon icon={faCog} />}
                rounded={12}
                p={4}
                fontWeight='medium'>
                Account Settings
              </MenuItem>

              <MenuItem
                icon={<FontAwesomeIcon icon={faSignOutAlt} />}
                onClick={() => dispatch(revokeAuth())}
                rounded={12}
                p={4}
                fontWeight='medium'>
                Logout
              </MenuItem>
              {/* <Card display='flex' as={RouterLink} to='/settings/account'>
              <Box>
                <Text fontWeight='medium' alignSelf='center'>
                  Account Settings
                </Text>
              </Box>
              <FontAwesomeIcon ml='auto' alignSelf='center' icon={faChevronRight} />
            </Card> */}
            </VStack>
          </MenuList>
        </Menu>
      </Box>
    </HStack>
  );
});

export default MainLayoutNav;
