import CardBoxLayout from '@/components/layouts/CardBoxLayout';
import CreateAccountForm from '@/components/forms/CreateAccountForm';
import Head from 'next/head';
import ProtectedRoute from '../auth/ProtectedRoute';
import React from 'react';

const RegisterPage = () => {
  return (
    <ProtectedRoute redirect='/' forNonAuthenticatedUserOnly>
      <Head>
        <title>Create Account | Knecthub</title>
      </Head>
      <CardBoxLayout heading='Create Account' goBackPath='/signin'>
        <CreateAccountForm />
      </CardBoxLayout>
    </ProtectedRoute>
  );
};

export default RegisterPage;
