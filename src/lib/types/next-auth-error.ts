import { NextAuthErrorCode } from '@/lib/constants/next-auth-error-codes';

export class NextAuthError extends Error {
  public code: NextAuthErrorCode;
  public status: number;

  constructor(message: string, code: NextAuthErrorCode, status: number) {
    super(message);
    this.name = 'NextAuthError';
    this.code = code;
    this.status = status;
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
      status: this.status,
    };
  }
}
