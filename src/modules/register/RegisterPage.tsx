import { Link, Text } from '@chakra-ui/react';

import CardBoxLayout from '@/components/layouts/CardBoxLayout';
import CreateAccountForm from '@/components/forms/CreateAccountForm';
import Head from 'next/head';
import NextLink from 'next/link';
import { PageWithLayout } from '@/typings/page';
import ProtectedRoute from '../auth/ProtectedRoute';
import React from 'react';

const RegisterPage: PageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Account | Knecthub</title>
      </Head>
      <Text mb={4} color='gray.400'>
        By signing up you accept our{' '}
        <NextLink href='/privacy-policy.html'>
          <Link color='orange.400'>Privacy Policy</Link>
        </NextLink>{' '}
        and{' '}
        <NextLink href='/terms-of-service.html'>
          <Link color='orange.400'>Terms of Service</Link>
        </NextLink>
        .
      </Text>
      <CreateAccountForm />
    </>
  );
};

RegisterPage.getLayout = (page) => (
  <ProtectedRoute redirect='/' forNonAuthenticatedUserOnly>
    <CardBoxLayout heading='Create Account' goBackPath='/signin'>
      {page}
    </CardBoxLayout>
  </ProtectedRoute>
);

export default RegisterPage;
