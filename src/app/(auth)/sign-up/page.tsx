import { Metadata } from 'next';
import SignUpPage from '@/components/containers/sign-up/sign-up-page';

export const metadata: Metadata = {
  title: 'Geotagger | Sign Up',
};

export default function Page() {
  return <SignUpPage />;
}
