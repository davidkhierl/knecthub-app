import Head from 'next/head';
import MainLayout from '@/components/layouts/MainLayout';
import ProtectedRoute from '../auth/ProtectedRoute';
import React from 'react';

const ConnectionsPage = () => {
  return (
    <>
      <Head>
        <title>Connections | Knecthub</title>
      </Head>
      <ProtectedRoute redirect='/signin'>
        <MainLayout>
          <h1>Connection Page</h1>
        </MainLayout>
      </ProtectedRoute>
    </>
  );
};

export default ConnectionsPage;
