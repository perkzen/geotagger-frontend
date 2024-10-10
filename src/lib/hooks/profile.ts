import { queryOptions, useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/lib/api/profile';

export const GET_PROFILE_KEY = 'GET_PROFILE_KEY';

export const useUserProfile = () => {
  return useQuery({
    queryKey: [GET_PROFILE_KEY],
    queryFn: getUserProfile,
  });
};

export const profileQueryOptions = queryOptions({
  queryKey: [GET_PROFILE_KEY],
  queryFn: getUserProfile,
});
