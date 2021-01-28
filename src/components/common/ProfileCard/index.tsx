import {
  Avatar,
  Box,
  BoxProps,
  Center,
  Text,
  VStack,
  forwardRef,
  useStyleConfig
} from '@chakra-ui/react';

import React from 'react';
import useUserStore from 'store/useUserStore';

const ProfileCard = forwardRef<BoxProps, 'div'>(({ children, ...props }, ref) => {
  const user = useUserStore((state) => state.user);

  const styles = useStyleConfig('ProfileCard');

  return (
    <Box ref={ref} sx={styles} {...props}>
      <VStack spacing={1}>
        <Center>
          <Avatar name={user?.fullName} size='2xl' bg={user?.profile.avatarBgColor} />
        </Center>
        <Text fontSize='lg' fontWeight='medium'>
          {user?.fullName}
        </Text>
        <Text fontSize='sm' fontWeight='light'>
          Web Developer
        </Text>
        <Text fontSize='sm' fontWeight='medium'>
          AMS Sustainment
        </Text>
      </VStack>
    </Box>
  );
});

export default ProfileCard;
