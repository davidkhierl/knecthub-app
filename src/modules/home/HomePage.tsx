import Head from 'next/head';
import MainLayout from '@/components/layouts/MainLayout';
import { PageWithLayout } from '@/typings/page';
import ProtectedRoute from '../auth/ProtectedRoute';
import React from 'react';

const HomePage: PageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home | Knecthub</title>
      </Head>
      <h1>Knecthub</h1>
    </>
  );
};

HomePage.getLayout = (page) => (
  <ProtectedRoute redirect='/signin'>
    <MainLayout>{page}</MainLayout>
  </ProtectedRoute>
);

export default HomePage;
