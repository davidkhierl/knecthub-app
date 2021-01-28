import { Alert, AlertIcon, AlertTitle, Box, Center, Flex, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import DefaultLayout from 'layouts/DefaultLayout';
import KnecthubSpinner from 'components/common/Loaders/KnecthubSpinner';
import LottieLoader from 'components/common/LottieLoader';
import { ReactComponent as MyPasswordArtwork } from 'assets/images/artworks/home.svg';
import SuccessAnimation from 'assets/animations/success-animation.json';
import api from 'services/api';
import queryString from 'query-string';

const EmailVerify = () => {
  const { token } = queryString.parse(window.location.search) as { token: string };

  const [isLoading, setIsLoading] = useState(token !== undefined);

  const [isSuccess, setIsSuccess] = useState<boolean>();

  const [error, setError] = useState<{ message: string }>();

  useEffect(() => {
    (async () => {
      if (token)
        await api
          .get(`email/verify?token=${token}`)
          .then(() => {
            setIsLoading(false);
            setIsSuccess(true);
          })
          .catch((error) => {
            setIsLoading(false);
            setError({ message: error.response ? error.response.data.message : error.message });
          });
    })();
  }, [token]);

  return (
    <DefaultLayout
      tagLine='Your one stop platform to connecting people and businesses worldwide.'
      artwork={<MyPasswordArtwork height='100%' width='100%' />}>
      <Flex flexDirection='column' h='100%'>
        <Center h='100%' minH='320px' pb={8}>
          {isLoading ? (
            <KnecthubSpinner />
          ) : (
            <Box w={['260px', '420px', '360px', '420px']}>
              {isSuccess && (
                <>
                  <LottieLoader animationData={SuccessAnimation} loop={false} />
                  <Heading textAlign='center' mt='4'>
                    Email Verified!
                  </Heading>
                </>
              )}
              {error && (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertTitle>{error.message}</AlertTitle>
                </Alert>
              )}
            </Box>
          )}
        </Center>
      </Flex>
    </DefaultLayout>
  );
};

export default EmailVerify;
