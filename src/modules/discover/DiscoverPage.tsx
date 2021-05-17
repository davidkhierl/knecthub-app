import { Center, Heading, Input, InputGroup, InputLeftElement, VStack } from '@chakra-ui/react';

import Head from 'next/head';
import { HiSearch } from 'react-icons/hi';
import MainLayout from '@/components/layouts/MainLayout';
import { PageWithLayout } from '@/typings/page';
import ProtectedRoute from '../auth/ProtectedRoute';
import React from 'react';
import UndrawVoiceInterface from '@/assets/img/undraw_voice_interface.svg';

const DiscoverPage: PageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Discover | Knecthub</title>
      </Head>
      <Center h='full'>
        <VStack spacing={8}>
          <Heading>Discover events!</Heading>
          <UndrawVoiceInterface width='300px' />
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <HiSearch />
            </InputLeftElement>
            <Input type='text' placeholder='Search events' />
          </InputGroup>
        </VStack>
      </Center>
    </>
  );
};

DiscoverPage.getLayout = (page) => (
  <ProtectedRoute redirect='/signin'>
    <MainLayout>{page}</MainLayout>
  </ProtectedRoute>
);

export default DiscoverPage;
