import { api } from '@/lib/api/index';
import { ApiRoutes } from '@/lib/constants/api-routes';
import { Profile } from '@/lib/models/profile';
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
