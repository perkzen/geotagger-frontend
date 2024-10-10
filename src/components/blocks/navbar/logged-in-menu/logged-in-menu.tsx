'use client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Add } from '@mui/icons-material';
import { Avatar, Button, IconButton, Typography } from '@mui/material';
import { Routes } from '@/lib/constants/routes';
import { useSignOut } from '@/lib/hooks/auth';
import { useUserProfile } from '@/lib/hooks/profile';
import styles from './logged-in-menu.module.scss';

const LoggedInMenu = () => {
  const { push } = useRouter();
  const t = useTranslations('shared');
  const { mutateAsync: signOut } = useSignOut();
  const { data: profile } = useUserProfile();

  const imageUrl = profile?.imageUrl || undefined;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className={styles.container}>
      <Button onClick={() => push(Routes.home)}>{t('home')}</Button>
      <Button>{t('profileSettings')}</Button>
      <Button onClick={handleSignOut}>{t('logout')}</Button>
      <div className={styles.user}>
        <Avatar className={styles.avatar} src={imageUrl} />
        <Typography variant="body1" className={styles.points}>
          {profile?.points}
        </Typography>
      </div>
      <IconButton className={styles.add}>
        <Add />
      </IconButton>
    </div>
  );
};

export default LoggedInMenu;
