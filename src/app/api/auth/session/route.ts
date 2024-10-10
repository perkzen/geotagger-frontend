import { getServerSession } from '@/lib/server/auth';

export function GET() {
  const session = getServerSession();
  return Response.json(session, { status: 200 });
}
