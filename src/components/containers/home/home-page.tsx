import LoggedInHomePage from '@/components/containers/home/logged-in/logged-in-home-page';
import LoggedOutHomePage from '@/components/containers/home/logged-out/logged-out-home-page';

type HomePageProps = {
  isAuth: boolean;
};

export default function HomePage({ isAuth }: HomePageProps) {
  if (!isAuth) {
    return <LoggedOutHomePage />;
  }

  return <LoggedInHomePage />;
}
