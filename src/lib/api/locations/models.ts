import { Coordinates } from '@/lib/types/coordinates';
import { Pagination } from '@/lib/types/pagination';
import { AddLocationFormData } from '@/lib/validators/add-location';

export type GeocodeResponse = {
  address: string;
};

export type Location = {
  id: string;
  userId: string;
  imageUrl: string;
  address: string;
  lat: number;
  lng: number;
};

export type Guess = {
  id: string;
  distanceText: number;
  createdAt: string;
  user: {
    id: string;
    firstname: string;
    lastname: string;
    imageUrl: string;
  };
};

export type GuessDetails = {
  id: string;
  locationId: string;
  userId: string;
  distance: number;
  distanceText: string;
  address: string;
  createdAt: string;
};

export type LocationDetails = Location & {
  guesses: Guess[];
};

export type LocationsList = Pagination<Location>;

export type UpdateLocationPayload = AddLocationFormData & { id: string };

export type GuessLocationPayload = { id: string } & Coordinates;
