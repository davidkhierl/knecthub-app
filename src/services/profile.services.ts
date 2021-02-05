import { AxiosError, AxiosResponse } from 'axios';

import api from './api';
import { useMutation } from 'react-query';

export interface ProfilePatchRequest {
  bio?: string;
  company?: string;
  contactNumber?: string;
  jobTitle?: string;
  location?: string;
}

export const patchProfile = (request: ProfilePatchRequest) =>
  api.patch<StandardResponse<User>>('/profiles/me', request);

export function useProfileMutation() {
  return useMutation<
    AxiosResponse<StandardResponse<User>>,
    AxiosError<StandardErrorResponse>,
    ProfilePatchRequest
  >(patchProfile);
}
