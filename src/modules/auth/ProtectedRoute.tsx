import KnecthubSpinner from '@/components/common/KnecthubSpinner';
import React from 'react';
import isServer from '@/lib/isServer';
import queryString from 'query-string';
import useAuthStore from '@/store/useAuthStore';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export interface AuthenticatedRouteProps {
  children?: React.ReactNode;
  forNonAuthenticatedUserOnly?: boolean;
  redirect: string;
}

const ProtectedRoute = (props: AuthenticatedRouteProps) => {
  const { redirect } = queryString.parse(!isServer ? window.location.search : '') as {
    redirect: string;
  };

  const authenticated = useAuthStore((state) => state.authenticated);

  const isLoading = useAuthStore((state) => state.isLoading);

  const isSilentLoadingUser = useAuthStore((state) => state.isSilentLoadingUser);

  const loadSignedUser = useAuthStore((state) => state.loadSignedUser);

  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // Try to load signed user on initial load.
    if (!authenticated) loadSignedUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // For non authenticated user only, eg: login, register, password reset.
    if (!isLoading && authenticated && user && props.forNonAuthenticatedUserOnly)
      router.push(redirect ?? props.redirect);

    // For authenticated user.
    if (!isLoading && !authenticated && !user && !props.forNonAuthenticatedUserOnly)
      router.push(props.redirect ?? '/signin');

    // We only need to watch this three for any changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, authenticated, props.forNonAuthenticatedUserOnly]);

  // Display spinner while checking authentication.
  if (props.forNonAuthenticatedUserOnly) {
    if ((authenticated && user && !isLoading) || isSilentLoadingUser) return <KnecthubSpinner />;
  } else {
    if (isLoading || !authenticated || !user) return <KnecthubSpinner />;
  }

  // Finally returns children.
  return <>{props.children}</>;
};

export default ProtectedRoute;
