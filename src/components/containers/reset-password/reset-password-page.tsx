import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import ResetPasswordForm from '@/components/blocks/forms/reset-password-form/reset-password-form';
import styles from './reset-password-page.module.scss';

type ResetPasswordPageProps = {
  token: string;
};

export default function ResetPasswordPage({ token }: ResetPasswordPageProps) {
  const t = useTranslations('shared');

  return (
    <div className={styles.container}>
      <Typography variant="h3">{t('resetPassword')}</Typography>
      <ResetPasswordForm token={token} />
    </div>
  );
}
