import { Pagination } from '@/lib/types/pagination';

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
