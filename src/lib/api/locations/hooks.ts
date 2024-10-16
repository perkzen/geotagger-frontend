import {
  queryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { addLocation, geocode, getMyLocations } from '@/lib/api/locations';
import { GeocodeResponse } from '@/lib/api/locations/models';
import { ApiError } from '@/lib/types/api-error';
import { Coordinates } from '@/lib/types/coordinates';
import { PaginationQuery } from '@/lib/types/pagination';
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

export const MY_LOCATIONS_KEY = 'my-locations';

export const myLocationsQueryOptions = (query: PaginationQuery) =>
  queryOptions({
    queryKey: [MY_LOCATIONS_KEY],
    queryFn: () => getMyLocations(query),
  });

export const useMyLocations = (query: PaginationQuery) => {
  return useQuery(myLocationsQueryOptions(query));
};
