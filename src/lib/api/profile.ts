import { api } from '@/lib/api/index';
import { ApiRoutes } from '@/lib/constants/api-routes';
import { Profile } from '@/lib/models/profile';

export const getUserProfile = async () => {
  const res = await api.get<Profile>(ApiRoutes.profile);

  return res.data;
};
