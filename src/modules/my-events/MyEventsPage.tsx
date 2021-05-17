import { Button, Center, VStack } from '@chakra-ui/react';

import Head from 'next/head';
import MainLayout from '@/components/layouts/MainLayout';
import { PageWithLayout } from '@/typings/page';
import ProtectedRoute from '../auth/ProtectedRoute';
import React from 'react';
import UndrawEvents from '@/assets/img/undraw_events.svg';

const MyEventsPage: PageWithLayout = () => {
  return (
    <>
      <Head>
        <title>My Events | Knecthub</title>
      </Head>
      <Center h='full'>
        <VStack spacing={8}>
          <UndrawEvents width='300px' />
          <Button colorScheme='green'>Create Your First Event</Button>
        </VStack>
      </Center>
    </>
  );
};

MyEventsPage.getLayout = (page) => (
  <ProtectedRoute redirect='/signin'>
    <MainLayout>{page}</MainLayout>
  </ProtectedRoute>
);

export default MyEventsPage;
