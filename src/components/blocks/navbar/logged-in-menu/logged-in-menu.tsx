'use client';
import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';
import { useSignOut } from '@/lib/hooks/auth';
import styles from './logged-in-menu.module.scss';

const LoggedInMenu = () => {
  const t = useTranslations('shared');

  const { mutateAsync: signOut } = useSignOut();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className={styles.container}>
      <Button onClick={handleSignOut}>{t('logout')}</Button>
    </div>
  );
};

export default LoggedInMenu;
