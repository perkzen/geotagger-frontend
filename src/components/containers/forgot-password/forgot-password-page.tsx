import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import ForgotPasswordForm from "@/components/blocks/forms/forgot-password-form/forgot-password-form";
import styles from './forgot-password-page.module.scss';

export default function ForgotPasswordPage() {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.headline}>
        <Typography variant="h3">{t('shared.forgotPassword')}</Typography>
        <Typography variant="body1">
          {t('shared.forgotPasswordInfo')}
        </Typography>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
