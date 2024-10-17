import type { Metadata } from 'next';
import AddLocationPage from '@/components/containers/add-location/add-location-page';

export const metadata: Metadata = {
  title: 'Geotagger | Add Location',
};

export default function Page() {
  return <AddLocationPage />;
}
