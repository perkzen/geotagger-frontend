import { Metadata } from 'next';
import HomePage from '@/components/containers/home/home-page';
import { getSession } from '@/lib/server/session';

export const metadata: Metadata = {
  title: 'Geotagger | Home',
};

export default async function Page() {
  const session = await getSession();
  return <HomePage isAuth={!!session} />;
}
