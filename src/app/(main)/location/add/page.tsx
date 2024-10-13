import type { Metadata } from 'next';
import AddLocation from '@/components/containers/add-location/add-location';

export const metadata: Metadata = {
  title: 'Geotagger | Add Location',
};

export default function Page() {
  return <AddLocation />;
}
