import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout';
import { PageWithLayout } from '@/typings/page';
import ProtectedRoute from '../auth/ProtectedRoute';
import React from 'react';

const SettingsPage: PageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Account Setting | Knecthub</title>
      </Head>
      <h1>Account Setting</h1>
    </>
  );
};

SettingsPage.getLayout = (page) => (
  <ProtectedRoute redirect='/signin'>
    <MainLayout>{page}</MainLayout>
  </ProtectedRoute>
);

export default SettingsPage;
