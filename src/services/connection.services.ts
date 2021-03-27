import { AxiosError, AxiosResponse } from 'axios';

import api from './api';
import { useMutation } from 'react-query';

export const postConnectionRequest = (email: string) =>
  api.post(`/connections/request?email=${email}`);

export function useConnectionRequestMutation() {
  return useMutation<
    AxiosResponse<StandardResponse>,
    AxiosError<StandardErrorResponse>,
    { email: string }
  >((req) => postConnectionRequest(req.email));
}
