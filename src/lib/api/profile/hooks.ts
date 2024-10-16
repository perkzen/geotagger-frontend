import {
  queryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  getProfile,
  updateProfile,
  updateProfilePicture,
} from '@/lib/api/profile';
import { Models } from '@/lib/api/profile/models';
import { ApiError } from '@/lib/types/api-error';
import { ProfileSettingsFormData } from '@/lib/validators/profile-settings';

export const GET_PROFILE_KEY = 'GET_PROFILE_KEY';

export const profileQueryOptions = queryOptions({
  queryKey: [GET_PROFILE_KEY],
  queryFn: getProfile,
});

export const useProfile = () => {
  return useQuery(profileQueryOptions);
};

export const UPDATE_PROFILE_KEY = 'UPDATE_PROFILE_KEY';

export type UseUpdateProfileOptions = Omit<
  UseMutationOptions<
    Models,
    AxiosError<ApiError>,
    ProfileSettingsFormData,
    unknown
  >,
  'mutationFn' | 'mutationKey'
>;

export const useUpdateProfile = (options?: UseUpdateProfileOptions) => {
  return useMutation({
    ...options,
    mutationKey: [UPDATE_PROFILE_KEY],
    mutationFn: updateProfile,
  });
};

export const useUsersAuthProvider = () => {
  const { data } = useProfile();
  return data?.provider;
};

export const UPDATE_PROFILE_PICTURE_KEY = 'UPDATE_PROFILE_PICTURE_KEY';

type UseUpdateProfilePictureOptions = Omit<
  UseMutationOptions<void, AxiosError<ApiError>, File, unknown>,
  'mutationFn' | 'mutationKey'
>;

export const useUpdateProfilePicture = (
  options?: UseUpdateProfilePictureOptions
) => {
  return useMutation({
    ...options,
    mutationKey: [UPDATE_PROFILE_PICTURE_KEY],
    mutationFn: updateProfilePicture,
  });
};
