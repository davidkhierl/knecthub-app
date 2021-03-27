import { AxiosError, AxiosResponse } from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';

import api from 'services/api';
import { revokeAuth } from 'redux/authSlice';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

  return useQuery(['users', email], () => getUserByEmail(email), {
    onError: (err) => {
      if (err.response?.status === 401) dispatch(revokeAuth());
    },
    ...options
  });
}
