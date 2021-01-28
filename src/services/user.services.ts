import { AxiosError, AxiosResponse } from 'axios';
import api, { ResponseError } from './api';

import { useMutation } from 'react-query';

export interface UserPostRequest {
  company?: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export type UserPostResponse = User;

/**
 * User registration.
 * @param request UserPostRequest
 */
export const postUser = (request: UserPostRequest) => api.post<UserPostResponse>('/users', request);

/**
 * Current authenticated user.
 */
export const getCurrentUser = () => api.get('/users/me');

/**
 * User post query mutation.
 */
export function useUserMutation() {
  return useMutation<AxiosResponse<User>, AxiosError<ResponseError[]>, UserPostRequest>(postUser);
}
