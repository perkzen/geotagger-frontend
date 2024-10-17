export type Profile = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  imageUrl: string | null;
  points: number;
  provider: 'local' | 'google' | 'facebook';
};
