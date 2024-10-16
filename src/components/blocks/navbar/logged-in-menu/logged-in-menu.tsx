'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Add } from '@mui/icons-material';
import { Avatar, Button, IconButton, Typography } from '@mui/material';
import { Routes } from '@/lib/constants/routes';
import { useSignOut } from '@/lib/hooks/auth';
import { useProfile } from '@/lib/hooks/user';
import { useModalStore } from '@/lib/stores/modal-store';
import styles from './logged-in-menu.module.scss';

const LoggedInMenu = () => {
  const { push } = useRouter();
  const t = useTranslations('shared');
  const { mutateAsync: signOut } = useSignOut();
  const { data: profile } = useProfile();

  const { openModal } = useModalStore();
  const imageUrl = profile?.imageUrl || undefined;

  const handleSignOut = async () => {
    await signOut();
  };

  const handleOpenProfileSettings = () => {
    openModal({
      id: 'profile-settings',
      type: 'PROFILE_SETTINGS',
    });
  };

  return (
    <div className={styles.container}>
      <Button onClick={() => push(Routes.HOME)}>{t('home')}</Button>
      <Button onClick={handleOpenProfileSettings}>
        {t('profileSettings')}
      </Button>
      <Button onClick={handleSignOut}>{t('logout')}</Button>
      <Link href={Routes.PROFILE} className={styles.user}>
        <Avatar src={imageUrl} className={styles.avatar} />
        <Typography variant="body1" className={styles.points}>
          {profile?.points}
        </Typography>
      </Link>
      <IconButton
        className={styles.add}
        onClick={() => push(Routes.ADD_LOCATION)}
      >
        <Add />
      </IconButton>
    </div>
  );
};

export default LoggedInMenu;
