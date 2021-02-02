import { AxiosError, AxiosResponse } from 'axios';

import api from './api';
import { useMutation } from 'react-query';

export interface ResetPasswordPostRequest {
  email: string;
}

export const postResetPassword = (request: ResetPasswordPostRequest) =>
  api.post<StandardResponse>('/password/reset', request);

export function useResetPasswordRequestMutation() {
  return useMutation<
    AxiosResponse<StandardResponse>,
    AxiosError<StandardErrorResponse>,
    ResetPasswordPostRequest
  >(postResetPassword);
}

export interface ResetPasswordPatchRequest {
  password: string;
  confirmPassword: string;
}

export const patchResetPassword = (request: ResetPasswordPatchRequest, token: string) =>
  api.patch<StandardResponse<User>>(`/password/reset?token=${token}`, request);

export function useResetPasswordMutation(token: string) {
  return useMutation<
    AxiosResponse<StandardResponse<User>>,
    AxiosError<StandardErrorResponse>,
    ResetPasswordPatchRequest
  >((request) => patchResetPassword(request, token));
}

export interface ChangePasswordPatchRequest {
  confirmNewPassword: string;
  currentPassword: string;
  newPassword: string;
}

export const patchChangePassword = (request: ChangePasswordPatchRequest) =>
  api.patch<StandardResponse>('/password', request);

export function useChangePasswordMutation() {
  return useMutation<
    AxiosResponse<StandardResponse>,
    AxiosError<StandardErrorResponse>,
    ChangePasswordPatchRequest
  >((request) => patchChangePassword(request));
}
