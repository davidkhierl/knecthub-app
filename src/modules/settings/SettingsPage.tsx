import { Center, Text, VStack } from '@chakra-ui/react';

import Head from 'next/head';
import KnecthubSpinner from '@/components/common/KnecthubSpinner';
import MainLayout from '@/components/layouts/MainLayout';
import { PageWithLayout } from '@/typings/page';
import ProtectedRoute from '../auth/ProtectedRoute';
import React from 'react';

const SettingsPage: PageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Setting | Knecthub</title>
      </Head>
      <Center h='full'>
        <VStack spacing={8}>
          <KnecthubSpinner />
          <Text>Connecting to server...</Text>
        </VStack>
      </Center>
    </>
  );
};

SettingsPage.getLayout = (page) => (
  <ProtectedRoute redirect='/signin'>
    <MainLayout>{page}</MainLayout>
  </ProtectedRoute>
);

export default SettingsPage;
