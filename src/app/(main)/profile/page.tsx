import type { Metadata } from 'next';
import ProfilePage from '@/components/containers/profile/profile-page';

export const metadata: Metadata = {
  title: 'Geotagger | Profile',
};

export default function Page() {
  return <ProfilePage />;
}
