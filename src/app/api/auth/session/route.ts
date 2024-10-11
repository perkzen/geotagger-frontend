import { getServerSession } from '@/lib/server/auth';

export function GET() {
  const session = getServerSession();

  if (!session.session) {
    return Response.json(session, { status: 401 });
  }

  return Response.json(session, { status: 200 });
}
