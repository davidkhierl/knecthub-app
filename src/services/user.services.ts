import { AxiosError, AxiosResponse } from 'axios';

import api from '@/services/api';
import { useMutation } from 'react-query';

export interface UserRegisterRequest {
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
export const postUserRegister = (request: UserRegisterRequest) =>
  api.post<StandardResponse<AuthSuccessResponse>>('/users', request);

/**
 * User post query mutation.
 */
export function useUserRegisterMutation() {
  return useMutation<
    AxiosResponse<StandardResponse<AuthSuccessResponse>>,
    AxiosError<StandardErrorResponse>,
    UserRegisterRequest
  >(postUserRegister);
}
