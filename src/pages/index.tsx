import Head from 'next/head';
import React from 'react';

export default function KnecthubApp() {
  return (
    <>
      <Head>
        <title>Knecthub</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>yow!</h1>
    </>
  );
}

export { getServerSideProps } from '@/chakra-ui/chakra';
