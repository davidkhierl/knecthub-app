import { Button, Center, Divider, Flex, Grid, Link, Text } from '@chakra-ui/react';
import { ImFacebook, ImLinkedin2, ImTwitter } from 'react-icons/im';

import CardBoxLayout from '@/components/layouts/CardBoxLayout';
import { FcGoogle } from 'react-icons/fc';
import Head from 'next/head';
import NextLink from 'next/link';
import { PageWithLayout } from '@/typings/page';
import ProtectedRoute from '@/modules/auth/ProtectedRoute';
import React from 'react';
import SignInWithCredentialsForm from '@/components/forms/SignInWithCredentialsForm';
import useAuthStore from '@/store/useAuthStore';

const SignInPage: PageWithLayout = () => {
  const error = useAuthStore((state) => state.error);

  return (
    <>
      <Head>
        <title>Sign In | Knecthub</title>
      </Head>
      <Text mb={4} color='gray.400'>
        By signing in you accept our{' '}
        <NextLink href='/privacy-policy.html'>
          <Link color='orange.400'>Privacy Policy</Link>
        </NextLink>{' '}
        and{' '}
        <NextLink href='/terms-of-service.html'>
          <Link color='orange.400'>Terms of Service</Link>
        </NextLink>
        .
      </Text>
      <Grid gap={2}>
        <Button
          variant='outline'
          leftIcon={<FcGoogle />}
          as='a'
          href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google?redirect=test`}>
          Sign in with Google
        </Button>
        {/* TODO: Temporary hide disabled signin options. */}
        <Button variant='outline' leftIcon={<ImFacebook color='#4267B2' />} disabled>
          Sign in with Facebook
        </Button>
        <Button variant='outline' leftIcon={<ImTwitter color='#1DA1F2' />} disabled>
          Sign in with Twitter
        </Button>
        <Button variant='outline' leftIcon={<ImLinkedin2 color='#2867B2' />} disabled>
          Sign in with LinkedIn
        </Button>
      </Grid>
      <Flex mx='auto' my={4} justifyContent='center' alignItems='center'>
        <Divider orientation='horizontal' w='80px' />
        <Text px={3}>or</Text>
        <Divider orientation='horizontal' w='80px' />
      </Flex>
      <SignInWithCredentialsForm />
      {error && (
        <Center mt={4}>
          <NextLink href='/password/reset'>
            <Link color='blue.500' fontWeight='medium'>
              Having trouble signing in?
            </Link>
          </NextLink>
        </Center>
      )}
      <NextLink href='/register' passHref>
        <Button variant='outline' isFullWidth mt={4} as='a'>
          Create Account
        </Button>
      </NextLink>
    </>
  );
};

SignInPage.getLayout = (page) => (
  <ProtectedRoute redirect={'/'} forNonAuthenticatedUserOnly>
    <CardBoxLayout heading='Sign In'>{page}</CardBoxLayout>
  </ProtectedRoute>
);

export default SignInPage;
