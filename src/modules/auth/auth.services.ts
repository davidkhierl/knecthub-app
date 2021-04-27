import { AxiosError, AxiosResponse } from 'axios';

import api from '@/services/api';
import { useMutation } from 'react-query';

export const getAuthLogout = () => api.get('/auth/signout');

interface Request {
  email: string;
  password: string;
}

export const postAuthLogin = (request: Request) =>
  api.post<StandardResponse<AuthSuccessResponse>>('/auth/signin', request);

export function useAuthMutation() {
  return useMutation<
    AxiosResponse<StandardResponse<AuthSuccessResponse>>,
    AxiosError<StandardErrorResponse>,
    Request
  >(postAuthLogin);
}
