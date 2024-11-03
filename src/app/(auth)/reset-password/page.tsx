import { Metadata } from 'next';
import ResetPasswordPage from '@/components/containers/reset-password/reset-password-page';

export const metadata: Metadata = {
  title: 'Geotagger | Reset Password',
};

export default function Page({ searchParams }: {searchParams: {
    token: string;
  } }) {
  return <ResetPasswordPage token={searchParams.token} />;
}
