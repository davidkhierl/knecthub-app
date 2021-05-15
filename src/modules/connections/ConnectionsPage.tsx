import Head from 'next/head';
import MainLayout from '@/components/layouts/MainLayout';
import { PageWithLayout } from '@/typings/page';
import ProtectedRoute from '../auth/ProtectedRoute';
import React from 'react';

const ConnectionsPage: PageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Connections | Knecthub</title>
      </Head>

      <h1>Connection Page</h1>
    </>
  );
};

ConnectionsPage.getLayout = (page) => (
  <ProtectedRoute redirect='/signin'>
    <MainLayout>{page}</MainLayout>
  </ProtectedRoute>
);

export default ConnectionsPage;
