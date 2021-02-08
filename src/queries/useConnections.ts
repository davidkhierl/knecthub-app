import api from 'services/api';
import { useQuery } from 'react-query';

export interface Connection {
  id: string;
  sender: User | null;
  receiver: User | null;
  status: 'pending' | 'accepted' | 'ignored';
}

export const getConnections = () => api.get<StandardResponse<Connection[]>>('/connections');

export default function useConnections() {
  return useQuery('connections', getConnections);
}
