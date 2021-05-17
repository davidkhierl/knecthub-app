import { Button, Center, Heading, VStack } from '@chakra-ui/react';

import Head from 'next/head';
import { HiSearch } from 'react-icons/hi';
import MainLayout from '@/components/layouts/MainLayout';
import { PageWithLayout } from '@/typings/page';
import ProtectedRoute from '../auth/ProtectedRoute';
import React from 'react';
import UndrawConference from '@/assets/img/undraw_conference.svg';

const HomePage: PageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home | Knecthub</title>
      </Head>
      <Center h='full'>
        <VStack spacing={8}>
          <Heading>Welcome to Knecthub</Heading>
          <UndrawConference width='300px' />
          <Button size='lg' colorScheme='blue' leftIcon={<HiSearch />}>
            Discover Events
          </Button>
        </VStack>
      </Center>
    </>
  );
};

HomePage.getLayout = (page) => (
  <ProtectedRoute redirect='/signin'>
    <MainLayout>{page}</MainLayout>
  </ProtectedRoute>
);

export default HomePage;
