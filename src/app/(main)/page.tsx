import { Metadata } from 'next';
import HomePage from '@/components/containers/home/home-page';

export const metadata: Metadata = {
  title: 'Geotagger | Home',
};

export default function Page() {
  return <HomePage />;
}
