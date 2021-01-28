import { AxiosError, AxiosResponse } from 'axios';
import api, { ResponseError } from './api';

import { useMutation } from 'react-query';

/**
 * TODO: Standard response.
 */
export const getAuthLogout = () => api.get('/auth/logout');

export interface AuthPostRequest {
  email: string;
  password: string;
}

export const postAuthLogin = (request: AuthPostRequest) => api.post<User>('/auth/login', request);

export function useAuthMutation() {
  return useMutation<AxiosResponse<User>, AxiosError<ResponseError[]>, AuthPostRequest>(
    postAuthLogin
  );
}
