import { NextRequest } from 'next/server';
import { NextAuthErrorCodes } from '@/lib/constants/next-auth-error-codes';
import { validateSession } from '@/lib/server/session';
import { NextAuthError } from '@/lib/types/next-auth-error';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.split('Bearer ')[1];

  const session = await validateSession(token);

  if (!session) {
    return Response.json(
      new NextAuthError(
        'Invalid session',
        NextAuthErrorCodes.INVALID_SESSION,
        401
      ),
      {
        status: 401,
      }
    );
  }

  return Response.json(session, { status: 200 });
}
