import { Box, useColorModeValue } from '@chakra-ui/react';

import ConnectionGrid from 'components/connections/ConnectionGrid';
import ProfileHeader from 'components/profile/ProfileHeader';
import React from 'react';

const ProfileMe = () => {
  const mainBoxBg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box bg={mainBoxBg} flexGrow={1} transition='all .3s eas'>
      <ProfileHeader />
      <ConnectionGrid mt={6} />
    </Box>
  );
};

export default ProfileMe;
