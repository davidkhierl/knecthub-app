import { AxiosError, AxiosResponse } from 'axios';
import { UseMutationOptions, useMutation } from 'react-query';

import api from './api';

export function getAuthLogout() {
  return api.get('/auth/signout');
}

export interface PostAuthSignInRequest {
  email: string;
  password: string;
}

export function postAuthSignIn(request: PostAuthSignInRequest) {
  return api.post<StandardResponse<AuthSuccessResponse>>('/auth/signin', request);
}

export function useAuthSignInMutation(
  options?: UseMutationOptions<
    AxiosResponse<StandardResponse<AuthSuccessResponse>>,
    AxiosError<StandardErrorResponse>,
    PostAuthSignInRequest,
    unknown
  >
) {
  return useMutation<
    AxiosResponse<StandardResponse<AuthSuccessResponse>>,
    AxiosError<StandardErrorResponse>,
    PostAuthSignInRequest
  >(postAuthSignIn, options);
}
