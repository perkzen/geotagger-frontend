import { Pagination } from '@/lib/types/pagination';
import { AddLocationFormData } from '@/lib/validators/add-location';

export type GeocodeResponse = {
  formattedAddress: string;
};

export type Location = {
  id: string;
  userId: string;
  imageUrl: string;
  address: string;
  lat: number;
  lng: number;
};

export type LocationsList = Pagination<Location>;

export type UpdateLocationPayload = AddLocationFormData & { id: string };
