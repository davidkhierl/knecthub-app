import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  useColorModeValue,
  useMediaQuery,
  useToast
} from '@chakra-ui/react';
import React, { Suspense } from 'react';

import KnecthubLogo from 'components/common/KnecthubLogo';
import KnecthubSpinner from 'components/common/Loaders/KnecthubSpinner';
import MainLayoutMobileNav from './MainLayoutMobileNav';
import MainLayoutNav from './MainLayoutNav';
import useMediaScreen from 'hooks/useMediaScreen';
import useUserStore from 'store/useUserStore';

const MainLayout: React.FC = ({ children }) => {
  const { mediumScreen } = useMediaScreen();

  const [isLargerThan360] = useMediaQuery('(min-width: 360px)');

  const headerBg = useColorModeValue('white', 'gray.700');

  const user = useUserStore((state) => state.user);

  const toast = useToast();

  return (
    <Flex minH='100vh' flexDirection='column'>
      <Box
        zIndex={1}
        position='sticky'
        top={0}
        as='header'
        h='60px'
        bg={headerBg}
        d='flex'
        flexShrink={0}
        alignItems='center'
        px={4}
        boxShadow='md'
        transition='all .3s eas'>
        <KnecthubLogo
          to='/'
          variant={isLargerThan360 ? 'logo-with-text-primary' : 'logo-only-primary'}
        />
        {!mediumScreen && <MainLayoutMobileNav ml='auto' />}
        {mediumScreen && <MainLayoutNav ml='auto' />}
      </Box>
      {!user?.isVerified && (
        <Alert status='warning' flexShrink={0}>
          <AlertIcon w='50px' />
          <Box flex='1'>
            <AlertTitle>Email not yet verified!</AlertTitle>
            {mediumScreen && (
              <>
                <AlertDescription display='block'>
                  We've sent you an email to verify your account, In order to fully use the features
                  of Knecthub, the email address of your account needs to be verified. Didn't get
                  any email or the link expired? Click the button bellow and we will send you a new
                  one.
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
              </>
            )}
          </Box>
        </Alert>
      )}
      <Suspense fallback={<KnecthubSpinner />}>{children}</Suspense>
    </Flex>
  );
};

export default MainLayout;
