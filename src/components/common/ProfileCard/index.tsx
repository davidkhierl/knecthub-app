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
import { faEnvelope, faMapPin, faPhone } from '@fortawesome/free-solid-svg-icons';

import ButtonLinkRouter from '../ButtonLinkRouter';
import { FontAwesomeIcon } from 'components/chakra-factory';
import React from 'react';
import useUserStore from 'store/useUserStore';

const ProfileCard = forwardRef<BoxProps, 'div'>(({ children, ...props }, ref) => {
  const user = useUserStore((state) => state.user);

  const styles = useStyleConfig('ProfileCard');

  return (
    <Box ref={ref} sx={styles} {...props}>
      <VStack spacing={2}>
        <Center>
          <Avatar name={user?.fullName} size='2xl' bg={user?.profile.avatarBgColor} />
        </Center>
        <Text fontSize='lg' fontWeight='medium'>
          {user?.fullName}
        </Text>
        {user?.profile.jobTitle && (
          <Text fontSize='sm' fontWeight='light'>
            {user.profile.jobTitle}
          </Text>
        )}
        {user?.profile.company && (
          <Text fontSize='sm' fontWeight='medium'>
            {user.profile.company}
          </Text>
        )}
        {user?.emails[0].email && (
          <Text fontSize='sm'>
            <FontAwesomeIcon icon={faEnvelope} mr={2} />
            {user?.emails[0].email}
          </Text>
        )}
        {user?.profile.contactNumber && (
          <Text fontSize='sm'>
            <FontAwesomeIcon icon={faPhone} mr={2} />
            {user?.profile.contactNumber}
          </Text>
        )}
        {user?.profile.location && (
          <Text fontSize='sm'>
            <FontAwesomeIcon icon={faMapPin} mr={2} />
            {user?.profile.location}
          </Text>
        )}
      </VStack>
      <ButtonLinkRouter to='/settings/profile' mt={4} size='sm' isFullWidth>
        Update Profile
      </ButtonLinkRouter>
    </Box>
  );
});

export default ProfileCard;
