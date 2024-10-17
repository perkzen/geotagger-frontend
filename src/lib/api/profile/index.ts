import { api } from '@/lib/api';
import { Profile } from '@/lib/api/profile/models';
import { ApiRoutes } from '@/lib/constants/api-routes';
import { ProfileSettingsFormData } from '@/lib/validators/profile-settings';

export const getProfile = async () => {
  const res = await api.get<Profile>(ApiRoutes.profile.base);

  return res.data;
};

export const updateProfile = async (data: ProfileSettingsFormData) => {
  const res = await api.patch<Profile>(ApiRoutes.profile.base, data);
  return res.data;
};

export const updateProfilePicture = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  await api.patch<void>(ApiRoutes.profile.image, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
