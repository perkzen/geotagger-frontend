import { api } from '@/lib/api';
import {
  GeocodeResponse,
  GuessDetails,
  Location,
  LocationDetails,
  LocationsList,
} from '@/lib/api/locations/models';
import { ApiRoutes } from '@/lib/constants/api-routes';
import { Coordinates } from '@/lib/types/coordinates';
import { PaginationQuery } from '@/lib/types/pagination';
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

export const getMyLocations = async (query: PaginationQuery) => {
  const res = await api.get<LocationsList>(
    ApiRoutes.locations.myLocations(query)
  );
  return res.data;
};

export const deleteLocation = async (id: string) => {
  await api.delete(ApiRoutes.locations.byId(id));
};

export const getLocation = async (id: string) => {
  const res = await api.get<LocationDetails>(ApiRoutes.locations.byId(id));
  return res.data;
};

export const updateLocation = async (id: string, data: AddLocationFormData) => {
  const formData = new FormData();

  formData.append('address', data.address);
  formData.append('lat', data.lat.toString());
  formData.append('lng', data.lng.toString());
  formData.append('image', data.fileList[0]);

  const res = await api.put<Location>(ApiRoutes.locations.byId(id), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

export const getLocations = async (query: PaginationQuery) => {
  const res = await api.get<LocationsList>(ApiRoutes.locations.list(query));
  return res.data;
};

export const guessLocation = async (id: string, data: Coordinates) => {
  const res = await api.post<GuessDetails>(ApiRoutes.locations.guess(id), data);
  return res.data;
};
