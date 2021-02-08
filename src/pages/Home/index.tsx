import { Divider, Heading, SimpleGrid } from '@chakra-ui/react';

import Container from 'components/common/Container';
import React from 'react';
import WebinarCard from 'components/common/WebinarCard';

const Home = () => {
  return (
    <Container mt={6}>
      <Heading>Upcoming Webinars</Heading>
      <Divider mb={6} mt={4} />
      <SimpleGrid columns={[1, 2, 2, 3, 4]} spacing={4} w='100%'>
        <WebinarCard>Webinar</WebinarCard>
        <WebinarCard>Webinar 2</WebinarCard>
        <WebinarCard>Webinar 3</WebinarCard>
        <WebinarCard>Webinar 4</WebinarCard>
        <WebinarCard>Webinar Card</WebinarCard>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
