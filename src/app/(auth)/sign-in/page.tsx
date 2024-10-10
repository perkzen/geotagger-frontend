import { Metadata } from 'next';
import SignInPage from '@/components/containers/sign-in/sign-in-page';

export const metadata: Metadata = {
  title: 'Geotagger | Sign In',
};

export default function Page() {
  return <SignInPage />;
}
