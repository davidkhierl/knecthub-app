import { AlertIcon, Box, Center, Flex, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import DefaultLayout from 'layouts/DefaultLayout';
import KnecthubSpinner from 'components/common/Loaders/KnecthubSpinner';
import MotionAlert from 'components/common/Motions/MotionAlert';
import { ReactComponent as MyPasswordArtwork } from 'assets/images/artworks/home.svg';
import ResetPasswordForm from 'components/forms/ResetPasswordForm';
import ResetPasswordRequestForm from 'components/forms/ResetPasswordRequestForm';
import api from 'services/api';
import queryString from 'query-string';

const PasswordReset = () => {
  const { token } = queryString.parse(window.location.search) as { token: string };

  const [isLoading, setIsLoading] = useState(token !== undefined);

  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    (async () => {
      if (token)
        await api
          .get(`/password/reset?token=${token}`)
          .then(() => {
            setIsValidToken(true);
            setIsLoading(false);
          })
          .catch(() => {
            setIsValidToken(false);
            setIsLoading(false);
          });
    })();
  }, [token]);

  return (
    <DefaultLayout
      sidePanelBg='#b1c5c3'
      tagLine='Your one stop platform to connecting people and businesses worldwide.'
      artwork={<MyPasswordArtwork height='100%' width='100%' />}>
      <Flex flexDirection='column' h='100%'>
        <Center h='100%' minH='320px' pb={8}>
          {isLoading ? (
            <KnecthubSpinner />
          ) : (
            <Box w={['260px', '420px', '360px', '420px']}>
              <Heading mb={4} as='h3' size='lg'>
                Reset Account Password
              </Heading>
              {token ? (
                isValidToken ? (
                  <ResetPasswordForm token={token} />
                ) : (
                  <MotionAlert
                    status='error'
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    mb={2}>
                    <AlertIcon />
                    Oops! Something went wrong.
                  </MotionAlert>
                )
              ) : (
                <ResetPasswordRequestForm />
              )}
            </Box>
          )}
        </Center>
      </Flex>
    </DefaultLayout>
  );
};

export default PasswordReset;
