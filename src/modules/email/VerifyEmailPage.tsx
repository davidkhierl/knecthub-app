import { Alert, AlertIcon, Button, Center, Text } from '@chakra-ui/react';
import React, { MemoExoticComponent, useEffect, useState } from 'react';

import CardBoxLayout from '@/components/layouts/CardBoxLayout';
import Head from 'next/head';
import KnecthubSpinner from '@/components/common/KnecthubSpinner';
import Link from 'next/link';
import LottieLoader from '@/components/common/LottieLoader';
import { PageWithLayout } from '@/typings/page';
import SuccessAnimation from '@/assets/lotties/success-animation.json';
import api from '@/services/api';
import isServer from '@/lib/isServer';
import queryString from 'query-string';
import useAuthStore from '@/store/useAuthStore';

const VerifyEmailPage: PageWithLayout & MemoExoticComponent<() => JSX.Element> = React.memo(() => {
  const { token } = queryString.parse(!isServer ? window.location.search : '') as {
    token?: string;
  };

  const setUser = useAuthStore((state) => state.setUser);

  const authenticated = useAuthStore((state) => state.authenticated);

  const loadSignedUser = useAuthStore((state) => state.loadSignedUser);

  const [isLoading, setIsLoading] = useState(true);

  const [isSuccess, setIsSuccess] = useState<boolean>();

  const [error, setError] = useState<{ message?: string }>();

  useEffect(() => {
    if (!authenticated) loadSignedUser();

    (async () => {
      if (token && token !== '') {
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
      } else {
        setIsLoading(false);

        setError({ message: 'Missing token.' });
      }
    })();
  }, []);

  console.log('render 1');

  return (
    <>
      <Head>
        <title>Email Verification | Knecthub</title>
      </Head>
      {isLoading && <KnecthubSpinner size={28} />}
      {isSuccess && (
        <>
          <Center>
            <LottieLoader animationData={SuccessAnimation} loop={false} size='200px' />
          </Center>
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
      {error?.message && (
        <Alert status='error' rounded='md' mt={4}>
          <AlertIcon />
          {error.message}
        </Alert>
      )}
    </>
  );
});

VerifyEmailPage.getLayout = (page) => (
  <CardBoxLayout heading='Email Verification'>{page}</CardBoxLayout>
);

export default VerifyEmailPage;
