import { AxiosError, AxiosResponse } from 'axios';

import api from './api';
import { useMutation } from 'react-query';

export interface PasswordResetPostRequest {
  email: string;
}

export const postPasswordReset = (request: PasswordResetPostRequest) =>
  api.post<StandardResponse>('/password/reset', request);

export function usePasswordResetRequestMutation() {
  return useMutation<
    AxiosResponse<StandardResponse>,
    AxiosError<StandardErrorResponse>,
    PasswordResetPostRequest
  >(postPasswordReset);
}

export interface PasswordResetPatchRequest {
  password: string;
  confirmPassword: string;
}

export const patchPasswordReset = (request: PasswordResetPatchRequest, token: string) =>
  api.patch<StandardResponse<User>>(`/password/reset?token=${token}`, request);

export function usePasswordResetMutation(token: string) {
  return useMutation<
    AxiosResponse<StandardResponse<User>>,
    AxiosError<StandardErrorResponse>,
    PasswordResetPatchRequest
  >((request) => patchPasswordReset(request, token));
}
