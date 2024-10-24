import {
  queryOptions,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  addLocation,
  deleteLocation,
  geocode,
  getLocation,
  getLocations,
  getMyLocations,
  guessLocation,
  updateLocation,
} from '@/lib/api/locations';
import {
  GeocodeResponse,
  GuessDetails,
  GuessLocationPayload,
  Location,
  UpdateLocationPayload,
} from '@/lib/api/locations/models';
import { ApiError } from '@/lib/types/api-error';
import { Coordinates } from '@/lib/types/coordinates';
import { PaginationQuery } from '@/lib/types/pagination';
import { AddLocationFormData } from '@/lib/validators/add-location';

export const GEOCODE_KEY = 'GEOCODE';

type UseGeocodeOptions = Omit<
  UseMutationOptions<GeocodeResponse, AxiosError<ApiError>, Coordinates>,
  'mutationFn' | 'mutationKey'
>;

export const useGeocode = (options?: UseGeocodeOptions) => {
  return useMutation({
    ...options,
    mutationKey: [GEOCODE_KEY],
    mutationFn: (query: Coordinates) => geocode(query),
  });
};

export const ADD_LOCATION_KEY = 'ADD_LOCATION';

type UseAddLocationOptions = Omit<
  UseMutationOptions<void, Error, AddLocationFormData, unknown>,
  'mutationFn' | 'mutationKey'
>;

export const useAddLocation = (options?: UseAddLocationOptions) => {
  return useMutation({
    ...options,
    mutationKey: [ADD_LOCATION_KEY],
    mutationFn: addLocation,
  });
};

export const MY_LOCATIONS_KEY = 'MY_LOCATIONS';

export const myLocationsQueryOptions = (query: PaginationQuery) =>
  queryOptions({
    queryKey: [MY_LOCATIONS_KEY, query],
    queryFn: () => getMyLocations(query),
  });

export const DELETE_LOCATION_KEY = 'DELETE_LOCATION';

type UseDeleteLocationOptions = Omit<
  UseMutationOptions<void, AxiosError, string, unknown>,
  'mutationFn' | 'mutationKey'
>;

export const useDeleteLocation = (options?: UseDeleteLocationOptions) => {
  return useMutation({
    ...options,
    mutationKey: [DELETE_LOCATION_KEY],
    mutationFn: (id: string) => deleteLocation(id),
  });
};

export const GET_LOCATION_KEY = 'GET_LOCATION';

export const locationQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [GET_LOCATION_KEY],
    queryFn: () => getLocation(id),
  });

export const UPDATE_LOCATION_KEY = 'UPDATE_LOCATION';

type UseUpdateLocationOptions = Omit<
  UseMutationOptions<Location, AxiosError, UpdateLocationPayload, unknown>,
  'mutationFn' | 'mutationKey'
>;

export const useUpdateLocation = (options?: UseUpdateLocationOptions) => {
  return useMutation({
    ...options,
    mutationKey: [UPDATE_LOCATION_KEY],
    mutationFn: ({ id, ...data }) => updateLocation(id, data),
  });
};

export const LOCATIONS_LIST_KEY = 'LOCATIONS_LIST';

export const locationsListQueryOptions = (query: PaginationQuery) =>
  queryOptions({
    queryKey: [LOCATIONS_LIST_KEY, query],
    queryFn: () => getLocations(query),
  });

export const GUSS_LOCATION_KEY = 'GUSS_LOCATION';

type UseGuessLocationOptions = Omit<
  UseMutationOptions<GuessDetails, AxiosError, GuessLocationPayload, unknown>,
  'mutationFn' | 'mutationKey'
>;

export const useGuessLocation = (options?: UseGuessLocationOptions) => {
  return useMutation({
    ...options,
    mutationKey: [GUSS_LOCATION_KEY],
    mutationFn: ({ id, ...data }: GuessLocationPayload) =>
      guessLocation(id, data),
  });
};
