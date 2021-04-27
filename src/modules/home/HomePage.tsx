import Head from 'next/head';
import Link from 'next/link';
import ProtectedRoute from '../auth/ProtectedRoute';
import React from 'react';
import useAuthStore from '../../store/useAuthStore';

const HomePage = () => {
  const user = useAuthStore((state) => state.user);

  const signOut = useAuthStore((state) => state.signOut);

  return (
    <>
      <Head>
        <title>Home | Knecthub</title>
      </Head>
      <ProtectedRoute redirect='/signin'>
        <h1>Knecthub</h1>
        <p>Sign in as {user?.fullName}</p>
        <Link href='/signin'>
          <a>sign in</a>
        </Link>
        <button onClick={signOut}>sign out</button>
      </ProtectedRoute>
    </>
  );
};

export default HomePage;
