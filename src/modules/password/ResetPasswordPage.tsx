import { Alert, AlertIcon } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import CardBoxLayout from '@/components/layouts/CardBoxLayout';
import Head from 'next/head';
import KnecthubSpinner from '@/components/common/KnecthubSpinner';
import { PageWithLayout } from '@/typings/page';
import PasswordResetForm from '@/components/forms/PasswordResetForm';
import ProtectedRoute from '../auth/ProtectedRoute';
import dynamic from 'next/dynamic';
import { getPasswordResetVerifyToken } from '@/services/user.services';
import isServer from '@/lib/isServer';
import queryString from 'query-string';

const PasswordResetRequestForm = dynamic(
  () => import('@/components/forms/PasswordResetRequestForm'),
  { ssr: false, loading: () => <KnecthubSpinner /> }
);

const ResetPasswordPage: PageWithLayout = () => {
  const { token } = queryString.parse(!isServer ? window.location.search : '') as {
    token: string;
  };

  const [isLoading, setIsLoading] = useState(token !== undefined);

  const [isTokenValid, setIsTokenValid] = useState(false);

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    (async () => {
      if (token !== undefined) {
        setIsLoading(true);

        try {
          await getPasswordResetVerifyToken(token);

          setIsTokenValid(true);

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setIsTokenValid(false);
          setHasError(true);
        }
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Reset Password | Knecthub</title>
      </Head>
      {isLoading ? (
        <KnecthubSpinner />
      ) : isTokenValid ? (
        <PasswordResetForm token={token} />
      ) : (
        <>
          {hasError && (
            <Alert status='error' rounded='md'>
              <AlertIcon />
              {token === '' ? 'Missing token.' : 'Invalid token.'}
            </Alert>
          )}
        </>
      )}
      {!isLoading && token === undefined && <PasswordResetRequestForm />}
    </>
  );
};

ResetPasswordPage.getLayout = (page) => (
  <ProtectedRoute redirect='/' forNonAuthenticatedUserOnly>
    <CardBoxLayout heading='Reset Password' goBackPath='/signin'>
      {page}
    </CardBoxLayout>
  </ProtectedRoute>
);

export default ResetPasswordPage;
