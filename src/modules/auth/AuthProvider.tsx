import React from 'react';
import { useRouter } from 'next/router';

export interface AuthProvideProps {
  children?: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProvideProps) => {
  const router = useRouter();

  return <div>{children}</div>;
};

export default AuthProvider;
