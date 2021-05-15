import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout';
import ProtectedRoute from '../auth/ProtectedRoute';
import React from 'react';

const SettingsPage = () => {
  return (
    <>
      <Head>
        <title>Account Setting | Knecthub</title>
      </Head>
      <ProtectedRoute redirect='/signin'>
        <MainLayout>
          <h1>Account Setting</h1>
        </MainLayout>
      </ProtectedRoute>
    </>
  );
};

export default SettingsPage;
