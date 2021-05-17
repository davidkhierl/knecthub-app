import React, { useEffect } from 'react';

import KnecthubSpinner from '@/components/common/KnecthubSpinner';
import ProtectedRoute from './ProtectedRoute';
import api from '@/services/api';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/router';

const AuthRedirectPage = () => {
  const authSuccess = useAuthStore((state) => state.authSuccess);

  const authFailed = useAuthStore((state) => state.authFailed);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<StandardResponse<User>>('/users/me');

        authSuccess(res.data.data);
      } catch (error) {
        authFailed(error.response.message);
        router.replace('/signin');
      }
    })();
  }, []);

  return (
    <ProtectedRoute redirect='/' forNonAuthenticatedUserOnly>
      <KnecthubSpinner />
    </ProtectedRoute>
  );
};

export default AuthRedirectPage;
