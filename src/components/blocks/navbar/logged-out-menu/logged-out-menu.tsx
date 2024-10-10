import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import { Routes } from '@/lib/constants/routes';
import styles from './logged-out-menu.module.scss';

const LoggedOutMenu = () => {
  const t = useTranslations('shared');

  return (
    <div className={styles.container}>
      <Link className={styles.bold} href={Routes.signIn}>
        {t('signIn')}
      </Link>
      <Typography variant="body1">{t('or')}</Typography>
      <Button variant="contained" href={Routes.signUp}>
        {t('signUp')}
      </Button>
    </div>
  );
};

export default LoggedOutMenu;
