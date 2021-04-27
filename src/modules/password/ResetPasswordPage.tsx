import CardBoxLayout from '@/components/layouts/CardBoxLayout';
import Head from 'next/head';
import ProtectedRoute from '../auth/ProtectedRoute';
import React from 'react';

const ResetPasswordPage = () => {
  return (
    <ProtectedRoute redirect='/' forNonAuthenticatedUserOnly>
      <Head>
        <title>Reset Password | Knecthub</title>
      </Head>
      <CardBoxLayout heading='Reset Password' goBackPath='/signin'>
        reset password
      </CardBoxLayout>
    </ProtectedRoute>
  );
};

export default ResetPasswordPage;
