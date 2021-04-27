import { AxiosError, AxiosResponse } from 'axios';

import api from '@/services/api';
import { useMutation } from 'react-query';

export const getAuthLogout = () => api.get('/auth/signout');

interface AuthSignInRequest {
  email: string;
  password: string;
}

export const postAuthSignIn = (request: AuthSignInRequest) =>
  api.post<StandardResponse<AuthSuccessResponse>>('/auth/signin', request);

export function useAuthSignInMutation() {
  return useMutation<
    AxiosResponse<StandardResponse<AuthSuccessResponse>>,
    AxiosError<StandardErrorResponse>,
    AuthSignInRequest
  >(postAuthSignIn);
}
