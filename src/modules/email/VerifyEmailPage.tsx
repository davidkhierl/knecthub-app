import { Alert, AlertIcon, Button, Center, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import CardBoxLayout from '@/components/layouts/CardBoxLayout';
import Head from 'next/head';
import KnecthubSpinner from '@/components/common/KnecthubSpinner';
import Link from 'next/link';
import LottieLoader from '@/components/common/LottieLoader';
import SuccessAnimation from '@/assets/lotties/success-animation.json';
import api from '@/services/api';
import { isServer } from '@/lib/isServer';
import queryString from 'query-string';
import useAuthStore from '@/store/useAuthStore';

const VerifyEmailPage = () => {
  const { token } = queryString.parse(!isServer ? window.location.search : '') as {
    token: string;
  };

  const setUser = useAuthStore((state) => state.setUser);

  const authenticated = useAuthStore((state) => state.authenticated);

  const [isLoading, setIsLoading] = useState(token !== undefined);

  const [isSuccess, setIsSuccess] = useState<boolean>();

  const [error, setError] = useState<{ message: string }>();

  useEffect(() => {
    (async () => {
      if (token)
        await api
          .get<StandardResponse<User>>(`email/verify?token=${token}`)
          .then((res) => {
            setIsLoading(false);

            setIsSuccess(true);

            if (authenticated) setUser(res.data.data);
          })
          .catch((error) => {
            setIsLoading(false);
            setError({ message: error.response ? error.response.data.message : error.message });
          });
    })();
  }, []);
  return (
    <>
      <Head>
        <title>Email Verification | Knecthub</title>
      </Head>
      <CardBoxLayout heading='Email Verification' goBackPath={error ? '/signin' : undefined}>
        {isLoading && <KnecthubSpinner size={28} />}
        {isSuccess && (
          <>
            <LottieLoader animationData={SuccessAnimation} loop={false} />
            <Text align='center'>Email Verification Success!</Text>
            <Center mt={4}>
              {authenticated ? (
                <Link href='/' passHref>
                  <Button as='a'>Home</Button>
                </Link>
              ) : (
                <Link href='/signin' passHref>
                  <Button as='a'>Sign In</Button>
                </Link>
              )}
            </Center>
          </>
        )}
        {error && (
          <Alert status='error' rounded='md' mt={4}>
            <AlertIcon />
            {error.message}
          </Alert>
        )}
      </CardBoxLayout>
    </>
  );
};
export default VerifyEmailPage;
