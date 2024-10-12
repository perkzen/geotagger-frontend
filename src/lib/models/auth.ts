export type AccessTokens = {
  accessToken: string;
  refreshToken: string;
};

export type SessionUser = {
  id: string;
  role: 'user' | 'admin';
  email: string;
};

export type Session = {
  session: boolean;
  user: SessionUser | null;
  error: string | null;
};

export const AuthErrorCodes = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  INCORRECT_PASSWORD: 'INCORRECT_PASSWORD',
} as const;

export type AuthErrorCodes =
  (typeof AuthErrorCodes)[keyof typeof AuthErrorCodes];
