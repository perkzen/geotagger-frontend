import { User } from '@/lib/api/auth/models';

export type Session = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
