import { api } from '@/lib/api/index';
import { ApiRoutes } from '@/lib/constants/api-routes';

export const getUserProfile = async () => {
  const res = await api.get(ApiRoutes.profile);

  return res.data;
};
