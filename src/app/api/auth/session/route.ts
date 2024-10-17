import { getServerSession } from '@/lib/server/auth';

export async function GET() {
  const session = await getServerSession();

  if (!session.session) {
    return Response.json(session, { status: 401 });
  }

  return Response.json(session, { status: 200 });
}
