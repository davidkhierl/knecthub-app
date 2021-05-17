import { Button, Center, Heading, VStack } from '@chakra-ui/react';

import Head from 'next/head';
import { HiPlus } from 'react-icons/hi';
import MainLayout from '@/components/layouts/MainLayout';
import { PageWithLayout } from '@/typings/page';
import ProtectedRoute from '../auth/ProtectedRoute';
import React from 'react';
import UndrawConnected from '@/assets/img/undraw_connected.svg';

const ConnectionsPage: PageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Connections | Knecthub</title>
      </Head>
      <Center h='full'>
        <VStack spacing={8}>
          <Heading>Grow your network!</Heading>
          <UndrawConnected width='300px' />
          <Button size='lg' colorScheme='blue' leftIcon={<HiPlus />}>
            Add Connection
          </Button>
        </VStack>
      </Center>
    </>
  );
};

ConnectionsPage.getLayout = (page) => (
  <ProtectedRoute redirect='/signin'>
    <MainLayout>{page}</MainLayout>
  </ProtectedRoute>
);

export default ConnectionsPage;
