import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout';
import ProtectedRoute from '../auth/ProtectedRoute';
import React from 'react';
import useAuthStore from '../../store/useAuthStore';

const HomePage = () => {
  const user = useAuthStore((state) => state.user);

  const signOut = useAuthStore((state) => state.signOut);

  console.log('home');
  return (
    <>
      <Head>
        <title>Home | Knecthub</title>
      </Head>
      <ProtectedRoute redirect='/signin'>
        <MainLayout>
          <h1>Knecthub</h1>
          {/* <p>Sign in as {user?.fullName}</p> */}
          <Link href='/signin'>
            <a>sign in</a>
          </Link>
          <button onClick={signOut}>sign out</button>
        </MainLayout>
      </ProtectedRoute>
    </>
  );
};

export default HomePage;
