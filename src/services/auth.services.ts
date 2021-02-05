import { AxiosError, AxiosResponse } from 'axios';

import api from './api';
import { useMutation } from 'react-query';

export const getAuthLogout = () => api.get('/auth/logout');

export interface AuthPostRequest {
  email: string;
  password: string;
}

export const postAuthLogin = (request: AuthPostRequest) =>
  api.post<StandardResponse<User>>('/auth/login', request);

export function useAuthMutation() {
  return useMutation<
    AxiosResponse<StandardResponse<User>>,
    AxiosError<StandardErrorResponse>,
    AuthPostRequest
  >(postAuthLogin);
}
