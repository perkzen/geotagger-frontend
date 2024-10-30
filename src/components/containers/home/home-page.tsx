import AdminHomePage from '@/components/containers/home/admin-home-page/admin-home-page';
import LoggedInHomePage from '@/components/containers/home/logged-in/logged-in-home-page';
import LoggedOutHomePage from '@/components/containers/home/logged-out/logged-out-home-page';
import { Session } from '@/lib/types/session';
import { isAdmin } from '@/lib/utils/is-admin';

type HomePageProps = {
  session: Session | null;
};

export default function HomePage({ session }: HomePageProps) {
  const isAuth = session !== null;

  if (!isAuth) {
    return <LoggedOutHomePage />;
  }

  if (isAdmin(session)) {
    return <AdminHomePage />;
  }

  return <LoggedInHomePage />;
}
