import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Tooltip,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { faAngleDown, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import KnecthubLogo from 'components/common/KnecthubLogo';
import KnecthubSpinner from 'components/common/Loaders/KnecthubSpinner';
import NavLinkRouter from 'components/common/NavLinkRouter';
import { Link as RouterLink } from 'react-router-dom';
import { revokeAuth } from 'redux/authSlice';
import { useDispatch } from 'react-redux';
import useUserStore from 'store/useUserStore';

const MainLayout: React.FC = ({ children }) => {
  const headerBg = useColorModeValue('white', 'gray.700');

  const user = useUserStore((state) => state.user);

  const dispatch = useDispatch();

  const toast = useToast();

  return (
    <Flex h='100%' flexDirection='column'>
      <Box
        as='header'
        h='60px'
        bg={headerBg}
        d='flex'
        flexShrink={0}
        alignItems='center'
        px={4}
        boxShadow='md'>
        <KnecthubLogo to='/' />
        <HStack as='nav' spacing='8px' ml='auto'>
          <NavLinkRouter to='/' tooltipLabel='Home'>
            Home
          </NavLinkRouter>
          <Spacer />
          <NavLinkRouter to='/profile/me' tooltipLabel={user?.fullName}>
            {user?.fullName}
          </NavLinkRouter>
          <Spacer />
          <Box>
            <Menu>
              <Tooltip label='Account' hasArrow arrowSize={6} borderRadius='6px'>
                <MenuButton
                  as={IconButton}
                  icon={<FontAwesomeIcon icon={faAngleDown} />}
                  variant='ghost'
                />
              </Tooltip>
              <MenuList px={2}>
                <MenuItem
                  as={RouterLink}
                  to='/settings/account'
                  icon={<FontAwesomeIcon icon={faCog} />}
                  w='250px'
                  borderRadius='0.375rem'>
                  Account Settings
                </MenuItem>
                <MenuItem
                  icon={<FontAwesomeIcon icon={faSignOutAlt} />}
                  onClick={() => dispatch(revokeAuth())}
                  borderRadius='0.375rem'>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </HStack>
      </Box>
      {!user?.isVerified && (
        <Alert status='warning' flexShrink={0}>
          <AlertIcon w='50px' />
          <Box flex='1'>
            <AlertTitle>Email not yet verified!</AlertTitle>
            <AlertDescription display='block'>
              We've sent you an email to verify your account, In order to fully use the features of
              Knecthub, the email address of your account needs to be verified. Didn't get any email
              or the link expired? Click the button bellow and we will send you a new one.
            </AlertDescription>
            <Button
              size='sm'
              mt={2}
              onClick={() =>
                toast({
                  title: 'Email verification sent!',
                  description:
                    "We've sent you an email to verify your account, to do so please click the link provided inside the email.",
                  status: 'success',
                  position: 'top',
                  duration: 9000,
                  isClosable: true
                })
              }>
              Send email verification
            </Button>
          </Box>
        </Alert>
      )}
      <Suspense fallback={<KnecthubSpinner />}>{children}</Suspense>
    </Flex>
  );
};

export default MainLayout;
