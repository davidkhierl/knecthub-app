import { AxiosError, AxiosResponse } from 'axios';

import api from 'services/api';
import { revokeAuth } from 'redux/authSlice';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

export const getCurrentUser = () => api.get<StandardResponse<User>>('/users/me');

export default function useUser() {
  const dispatch = useDispatch();

  return useQuery<AxiosResponse<StandardResponse<User>>, AxiosError<StandardErrorResponse>>(
    'currentUser',
    getCurrentUser,
    {
      onError: (err) => {
        if (err.response?.status === 401) dispatch(revokeAuth());
      }
    }
  );
}
