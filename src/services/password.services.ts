import { AxiosError, AxiosResponse } from 'axios';
import api, { ResponseError } from './api';

import { useMutation } from 'react-query';

export interface PasswordResetPostRequest {
  email: string;
}

export const postPasswordReset = (request: PasswordResetPostRequest) =>
  api.post<{ message: string }>('/password/reset', request);

export function usePasswordResetRequestMutation() {
  return useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError<string>,
    PasswordResetPostRequest
  >(postPasswordReset);
}

export interface PasswordResetPatchRequest {
  password: string;
  confirmPassword: string;
}

export const patchPasswordReset = (request: PasswordResetPatchRequest, token: string) =>
  api.patch<User>(`/password/reset?token=${token}`, request);

export function usePasswordResetMutation(token: string) {
  return useMutation<AxiosResponse<User>, AxiosError<ResponseError[]>, PasswordResetPatchRequest>(
    (request) => patchPasswordReset(request, token)
  );
}
