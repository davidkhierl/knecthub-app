import api from 'services/api';
import { useQuery } from 'react-query';

export const getCurrentUser = () => api.get<StandardResponse<User>>('/users/me');

export default function useUser() {
  return useQuery('user', getCurrentUser);
}
