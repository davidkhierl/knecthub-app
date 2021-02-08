import { AxiosError, AxiosResponse } from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';

import api from 'services/api';

export const getUserByEmail = (email: string | null) =>
  api.get<StandardResponse<User>>(`/users/search?email=${email}`);

export default function useUsers(
  email: string | null,
  options?: UseQueryOptions<
    AxiosResponse<StandardResponse<User>>,
    AxiosError<StandardErrorResponse>,
    AxiosResponse<StandardResponse<User>>
  >
) {
  return useQuery(['users', email], () => getUserByEmail(email), options);
}
