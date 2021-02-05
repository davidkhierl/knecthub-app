import { AxiosError, AxiosResponse } from 'axios';

import api from './api';
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
export const postUser = (request: UserPostRequest) =>
  api.post<StandardResponse<UserPostResponse>>('/users', request);

/**
 * Current authenticated user.
 */
export const getCurrentUser = () => api.get<StandardResponse<User>>('/users/me');

/**
 * User post query mutation.
 */
export function usePostUserMutation() {
  return useMutation<
    AxiosResponse<StandardResponse<UserPostResponse>>,
    AxiosError<StandardErrorResponse>,
    UserPostRequest
  >(postUser);
}

export interface UserPatchRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export type UserPatchResponse = User;

export const patchUser = (request: UserPatchRequest) =>
  api.patch<StandardResponse<UserPatchResponse>>('/users/me', request);

/**
 * User patch query mutation.
 */
export function usePatchUserMutation() {
  return useMutation<
    AxiosResponse<StandardResponse<UserPatchResponse>>,
    AxiosError<StandardErrorResponse>,
    UserPatchRequest
  >(patchUser);
}

export const getUserSearch = (email: string) =>
  api.get<StandardResponse<User>>(`/users/search?email=${email}`);
