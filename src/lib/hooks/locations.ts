import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { addLocation, geocode } from '@/lib/api/locations';
import { GeocodeResponse } from '@/lib/models/location';
import { ApiError } from '@/lib/types/api-error';
import { Coordinates } from '@/lib/types/coordinates';
import { AddLocationFormData } from '@/lib/validators/add-location';

export const GET_GEOCODE_KEY = 'get-geocode';

type UseGeocodeOptions = Omit<
  UseQueryOptions<
    GeocodeResponse,
    AxiosError<ApiError>,
    GeocodeResponse,
    [typeof GET_GEOCODE_KEY]
  >,
  'queryFn' | 'queryKey'
> & {
  query?: Coordinates;
};

export const useGeocode = ({ query, ...options }: UseGeocodeOptions) => {
  return useQuery({
    ...options,
    queryKey: [GET_GEOCODE_KEY],
    queryFn: () =>
      !!query ? geocode(query) : Promise.resolve({} as GeocodeResponse),
    enabled: false,
  });
};

export const ADD_LOCATION_KEY = 'add-location';

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
