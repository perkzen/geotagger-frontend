export const NextAuthErrorCodes = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  SESSION_NOT_FOUND: 'SESSION_NOT_FOUND',
  INVALID_SESSION: 'INVALID_SESSION',
} as const;

export type NextAuthErrorCode =
  (typeof NextAuthErrorCodes)[keyof typeof NextAuthErrorCodes];
