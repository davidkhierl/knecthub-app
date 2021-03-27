import { AxiosError, AxiosResponse } from 'axios';

import api from 'services/api';
import { revokeAuth } from 'redux/authSlice';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

export interface Connection {
  id: string;
  sender: User | null;
  receiver: User | null;
  status: 'pending' | 'accepted' | 'ignored';
}

export const getConnections = () => api.get<StandardResponse<Connection[]>>('/connections');

export default function useConnections() {
  const dispatch = useDispatch();

  return useQuery<AxiosResponse<StandardResponse<Connection[]>>, AxiosError<StandardErrorResponse>>(
    'connections',
    getConnections,
    {
      onError: (err) => {
        if (err.response?.status === 401) dispatch(revokeAuth());
      }
    }
  );
}
