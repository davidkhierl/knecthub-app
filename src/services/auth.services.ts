import { AxiosError, AxiosResponse } from 'axios';

import api from '@/services/api';
import { useMutation, UseMutationOptions } from 'react-query';

export const getAuthLogout = () => api.get('/auth/signout');

interface PostAuthSignIn {
  email: string;
  password: string;
}

export const postAuthSignIn = (request: PostAuthSignIn) =>
  api.post<StandardResponse<AuthSuccessResponse>>('/auth/signin', request);

export function useAuthSignInMutation(
  options?: UseMutationOptions<
    AxiosResponse<StandardResponse<AuthSuccessResponse>>,
    AxiosError<StandardErrorResponse>,
    PostAuthSignIn,
    unknown
  >
) {
  return useMutation<
    AxiosResponse<StandardResponse<AuthSuccessResponse>>,
    AxiosError<StandardErrorResponse>,
    PostAuthSignIn
  >(postAuthSignIn, options);
}
