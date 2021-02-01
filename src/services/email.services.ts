import { AxiosError, AxiosResponse } from 'axios';

import api from './api';
import { useMutation } from 'react-query';

export interface PrimaryEmailPatchRequest {
  email: string;
}

/**
 * Update primary email
 * @param request PrimaryEmailPatchRequest
 */
export const patchPrimaryEmail = (request: PrimaryEmailPatchRequest) =>
  api.patch<StandardResponse<User>>('/email/primary', request);

/**
 * Primary email patch query mutation
 */
export function usePatchPrimaryEmailMutation() {
  return useMutation<
    AxiosResponse<StandardResponse<User>>,
    AxiosError<StandardErrorResponse>,
    PrimaryEmailPatchRequest
  >(patchPrimaryEmail);
}
