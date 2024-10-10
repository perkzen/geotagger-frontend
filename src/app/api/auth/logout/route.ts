import { removeAuthCookies } from '@/lib/server/auth';

export async function POST() {
  removeAuthCookies();

  return new Response(undefined, { status: 200 });
}
