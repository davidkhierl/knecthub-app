import { Box, Center, Flex, Heading } from '@chakra-ui/react';

import ButtonLinkRouter from 'components/common/LinkRouter/ButtonLinkRouter';
import DefaultLayout from 'layouts/DefaultLayout';
import React from 'react';
import RegisterForm from 'components/forms/RegisterForm';
import { ReactComponent as RemoteTeamArtwork } from 'assets/images/artworks/remote-team.svg';

const Register = () => {
  return (
    <DefaultLayout
      sidePanelBg='#78a2cc'
      tagLine='Your one stop platform to connecting people and businesses worldwide.'
      artwork={<RemoteTeamArtwork height='100%' width='100%' />}>
      <Flex flexDirection='column' h='100%'>
        <Flex>
          <ButtonLinkRouter ml={4} mt={4} mr='auto' to='/login' colorScheme='teal' variant='link'>
            Already have an account?
          </ButtonLinkRouter>
        </Flex>
        <Center h='100%' minH='640px' pb={8}>
          <Box w={['260px', '420px', '360px', '420px']}>
            <Heading mb={4} as='h3' size='lg'>
              Register to Knecthub
            </Heading>
            <RegisterForm />
          </Box>
        </Center>
      </Flex>
    </DefaultLayout>
  );
};

export default Register;
