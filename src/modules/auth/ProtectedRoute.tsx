import KnecthubSpinner from '@/components/common/KnecthubSpinner';
import React from 'react';
import { isServer } from '@/lib/isServer';
import queryString from 'query-string';
import useAuthStore from '@/store/useAuthStore';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export interface AuthenticatedRouteProps {
  children?: React.ReactNode;
  redirect: string;
  forNonAuthenticatedUserOnly?: boolean;
}

const ProtectedRoute = (props: AuthenticatedRouteProps) => {
  const router = useRouter();

  const { redirect } = queryString.parse(!isServer ? window.location.search : '') as {
    redirect: string;
  };

  const isLoading = useAuthStore((state) => state.isLoading);

  const isSilentLoadingUser = useAuthStore((state) => state.isSilentLoadingUser);

  const loadSignedUser = useAuthStore((state) => state.loadSignedUser);

  const user = useAuthStore((state) => state.user);

  const authenticated = useAuthStore((state) => state.authenticated);

  useEffect(() => {
    if (!authenticated) loadSignedUser();
  }, []);

  useEffect(() => {
    // for non authenticated user only, eg: login, register, password reset.
    if (!isLoading && authenticated && user && props.forNonAuthenticatedUserOnly)
      router.push(redirect ?? props.redirect);

    // for authenticated user.
    if (!isLoading && !authenticated && !user && !props.forNonAuthenticatedUserOnly)
      router.push(props.redirect ?? '/signin');
  }, [isLoading, authenticated, props.forNonAuthenticatedUserOnly]);

  if (props.forNonAuthenticatedUserOnly) {
    if ((authenticated && user && !isLoading) || isSilentLoadingUser) return <KnecthubSpinner />;
  } else {
    if (isLoading || !authenticated || !user) return <KnecthubSpinner />;
  }

  return <>{props.children}</>;
};

export default ProtectedRoute;
