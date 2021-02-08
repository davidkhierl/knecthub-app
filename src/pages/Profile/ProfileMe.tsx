import { Grid, GridItem } from '@chakra-ui/react';

import ConnectionsList from 'components/connections/ConnectionsList';
import Container from 'components/common/Container';
import ProfileCard from 'components/common/ProfileCard';
import React from 'react';

const ProfileMe = () => {
  return (
    <Container mt={8}>
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        <GridItem colSpan={[5, 5, 5, 1]}>
          <ProfileCard />
        </GridItem>
        <GridItem colSpan={[5, 5, 5, 3]}>webinars to attend</GridItem>
        <GridItem colSpan={[5, 5, 5, 1]}>
          <ConnectionsList />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default ProfileMe;
