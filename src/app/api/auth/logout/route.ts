import { deleteSession } from '@/lib/server/session';

export async function GET() {
  await deleteSession();

  return new Response(undefined, {
    status: 200,
  });
}
