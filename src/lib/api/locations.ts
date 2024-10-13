import { api } from '@/lib/api/index';
import { ApiRoutes } from '@/lib/constants/api-routes';
import { GeocodeResponse } from '@/lib/models/location';
import { Coordinates } from '@/lib/types/coordinates';
import { AddLocationFormData } from '@/lib/validators/add-location';

export const geocode = async (query: Coordinates) => {
  const res = await api.get<GeocodeResponse>(
    ApiRoutes.locations.geocode(query)
  );
  return res.data;
};

export const addLocation = async (data: AddLocationFormData) => {
  const formData = new FormData();

  formData.append('address', data.address);
  formData.append('lat', data.lat.toString());
  formData.append('lng', data.lng.toString());
  formData.append('image', data.fileList[0]);

  await api.post(ApiRoutes.locations.add, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
