import { deleteSession } from '@/lib/server/auth/actions';

export async function GET() {
  await deleteSession();

  return new Response(undefined, {
    status: 200,
  });
}
