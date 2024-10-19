export const NextAuthErrorCodes = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  SESSION_NOT_FOUND: 'SESSION_NOT_FOUND',
} as const;

export type NextAuthErrorCode =
  (typeof NextAuthErrorCodes)[keyof typeof NextAuthErrorCodes];
