import { Container } from '@chakra-ui/react';
import React from 'react';

// import useUserStore from 'store/useUserStore';

const ProfileCurrentUser = () => {
  // const user = useUserStore((state) => state.user);
  return (
    <Container>
      {/* {user && user.profile && (
        <ProfileCard
          profile={{
            ...user?.profile
          }}
          editButton
        />
      )} */}
    </Container>
  );
};

export default ProfileCurrentUser;
