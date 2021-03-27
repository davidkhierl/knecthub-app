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

import ButtonLinkRouter from '../LinkRouter/ButtonLinkRouter';
import { FontAwesomeIcon } from 'components/chakra-factory';
import React from 'react';
import useUserStore from 'store/useUserStore';

export interface ProfileCardProps extends BoxProps {
  user?: User | null;
  displayBasicInfo?: boolean;
}

const ProfileCard = forwardRef<ProfileCardProps, 'div'>(
  ({ children, user: userProps, displayBasicInfo, ...props }, ref) => {
    const currentUser = useUserStore((state) => state.user);

    const styles = useStyleConfig('ProfileCard');

    const user = userProps ?? currentUser;

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
          {!displayBasicInfo && (
            <>
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
            </>
          )}
        </VStack>
        {currentUser && currentUser.id === user?.id ? (
          <ButtonLinkRouter to='/settings/profile' mt={4} size='sm' isFullWidth>
            Update Profile
          </ButtonLinkRouter>
        ) : (
          <>
            {/* {userConnection?.status === 'pending' && (
              <Button mt={4} isFullWidth disabled>
                Request Sent
              </Button>
            )} */}
            {/* {!userConnection && (
              <Button mt={4} isFullWidth>
                Send Connection Request
              </Button>
            )} */}
          </>
        )}
      </Box>
    );
  }
);

export default ProfileCard;
