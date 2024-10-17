'use client';
import { useQuery } from '@tanstack/react-query';
import LoggedInHomePage from '@/components/containers/home/logged-in/logged-in-home-page';
import LoggedOutHomePage from '@/components/containers/home/logged-out/logged-out-home-page';
import { sessionQueryOptions } from '@/lib/api/auth/hooks';

export default function HomePage() {
  const { data, isError } = useQuery(sessionQueryOptions);

  const isAuth = !!data?.session;

  if (isError || !isAuth) {
    return <LoggedOutHomePage />;
  }

  return <LoggedInHomePage />;
}
