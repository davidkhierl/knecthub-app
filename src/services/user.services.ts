import { AxiosError, AxiosResponse } from 'axios';

import api from '@/services/api';
import { useMutation } from 'react-query';

export interface PostUserRegister {
  company?: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

/**
 * User registration.
 * @param request UserPostRequest
 */
export const postUserRegister = (request: PostUserRegister) =>
  api.post<StandardResponse<AuthSuccessResponse>>('/users', request);

/**
 * User post query mutation.
 */
export function useUserRegisterMutation() {
  return useMutation<
    AxiosResponse<StandardResponse<AuthSuccessResponse>>,
    AxiosError<StandardErrorResponse>,
    PostUserRegister
  >(postUserRegister);
}

export interface PostPasswordReset {
  email: string;
}

/**
 * Password reset request
 * @param request PostPasswordReset
 */
export const postPasswordReset = (request: PostPasswordReset) =>
  api.post<StandardResponse>('/password/reset', request);

// export function usePasswordResetRequestMutation() {
//   return useMutation<
//     AxiosResponse<StandardResponse>,
//     AxiosError<StandardErrorResponse>,
//     PostPasswordReset
//   >(postPasswordReset);
// }

/**
 * Verify password reset token
 * @param token string
 */
export const getPasswordResetVerifyToken = (token: string) =>
  api.get<StandardResponse>(`/password/reset?token=${token}`);

export interface PatchPasswordReset {
  password: string;
  confirmPassword: string;
}

/**
 * Reset password
 * @param token string
 * @param request PathPasswordReset
 */
export const patchPasswordReset = (request: PatchPasswordReset, token: string) =>
  api.patch<StandardResponse<AuthSuccessResponse>>(`/password/reset?token=${token}`, request);

/**
 * User password reset mutation
 */
export function usePasswordResetMutation(token: string) {
  return useMutation<
    AxiosResponse<StandardResponse<AuthSuccessResponse>>,
    AxiosError<StandardErrorResponse>,
    PatchPasswordReset
  >((request) => patchPasswordReset(request, token));
}
