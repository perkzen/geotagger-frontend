import { useTranslations } from 'next-intl';
import { Avatar, Typography } from '@mui/material';
import SignUpForm from '@/components/blocks/sign-up-form/sign-up-form';
import styles from './sign-up-page.module.scss';

export default function SignUpPage() {
  const t = useTranslations('signUp');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.headline}>
          <Typography variant="h3">{t('title')}</Typography>
          <Typography variant="body1" color="textPrimary">
            {t('description')}
          </Typography>
        </div>
        <Avatar className={styles.avatar} />
        <SignUpForm />
      </div>
    </div>
  );
}
