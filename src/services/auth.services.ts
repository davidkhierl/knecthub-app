import { AxiosError, AxiosResponse } from 'axios';

import api from '@/services/api';
import { useMutation } from 'react-query';

export const getAuthLogout = () => api.get('/auth/signout');

interface PostAuthSignIn {
  email: string;
  password: string;
}

export const postAuthSignIn = (request: PostAuthSignIn) =>
  api.post<StandardResponse<AuthSuccessResponse>>('/auth/signin', request);

export function useAuthSignInMutation() {
  return useMutation<
    AxiosResponse<StandardResponse<AuthSuccessResponse>>,
    AxiosError<StandardErrorResponse>,
    PostAuthSignIn
  >(postAuthSignIn);
}
