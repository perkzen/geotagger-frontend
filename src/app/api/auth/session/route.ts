import { NextRequest } from 'next/server';
import { NextAuthErrorCodes } from '@/lib/constants/next-auth-error-codes';
import { getServerSession } from '@/lib/server/session';
import { NextAuthError } from '@/lib/types/next-auth-error';

export async function GET(req: NextRequest) {
  const session = await getServerSession(req);

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
