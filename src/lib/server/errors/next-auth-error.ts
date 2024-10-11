export const NextAuthErrorCodes = {
  ACCESS_TOKEN_NOT_FOUND: 'ACCESS_TOKEN_NOT_FOUND',
} as const;

export type NextAuthErrorCode =
  (typeof NextAuthErrorCodes)[keyof typeof NextAuthErrorCodes];

export class NextAuthError extends Error {
  public code: NextAuthErrorCode;
  public status: number;

  constructor(message: string, code: NextAuthErrorCode, status: number) {
    super(message);
    this.name = 'NextAuthError';
    this.code = code;
    this.status = status;
  }
}
