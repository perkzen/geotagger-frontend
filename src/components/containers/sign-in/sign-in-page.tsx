import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import SignInForm from '@/components/blocks/sign-in-form/sign-in-form';
import styles from './sign-in-page.module.scss';

export default function SignInPage() {
  const t = useTranslations('signIn');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.headline}>
          <Typography variant="h3">{t('title')}</Typography>
          <Typography variant="body1" color="textPrimary">
            {t('description')}
          </Typography>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
