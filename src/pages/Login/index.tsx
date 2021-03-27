import { Box, Center, Flex, Heading } from '@chakra-ui/react';

import ButtonLinkRouter from 'components/common/LinkRouter/ButtonLinkRouter';
import DefaultLayout from 'layouts/DefaultLayout';
import LoginForm from 'components/forms/LoginForm';
import React from 'react';
import { ReactComponent as SalesTeamArtwork } from 'assets/images/artworks/sales-team.svg';

const Login = () => {
  return (
    <DefaultLayout
      sidePanelBg='#a6dcef'
      tagLine='Your one stop platform to connecting people and businesses worldwide.'
      artwork={<SalesTeamArtwork height='100%' width='100%' />}>
      <Flex flexDirection='column' h='100%'>
        <ButtonLinkRouter ml='auto' mt={4} mr={4} to='/register' colorScheme='blue' variant='link'>
          Create Account
        </ButtonLinkRouter>
        <Center h='100%' minH='360px' pb={8}>
          <Box w={['260px', '420px', '360px', '420px']}>
            <Heading mb={4} as='h3' size='lg'>
              Login to Knecthub
            </Heading>
            <LoginForm />
            <Box mt={3} alignItems='center'>
              <ButtonLinkRouter to='/password/reset/' colorScheme='blue' variant='link'>
                Having troubles logging in?
              </ButtonLinkRouter>
            </Box>
          </Box>
        </Center>
      </Flex>
    </DefaultLayout>
  );
};

export default Login;
