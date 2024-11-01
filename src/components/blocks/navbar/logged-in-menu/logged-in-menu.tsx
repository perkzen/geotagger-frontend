'use client';
import { FC, Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Add } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import UserPoints from '@/components/blocks/navbar/user-points/user-points';
import UserPointsSkeleton from '@/components/blocks/navbar/user-points/user-points-skeleton';
import { Routes } from '@/lib/constants/routes';
import { useProfileSettingsModal } from '@/lib/hooks/use-profile-settings-modal';
import styles from './logged-in-menu.module.scss';

type LoggedInMenuProps = {
  handleSignOut: () => void;
};

const LoggedInMenu: FC<LoggedInMenuProps> = ({ handleSignOut }) => {
  const t = useTranslations('shared');
  const { push } = useRouter();

  const handleOpenProfileSettings = useProfileSettingsModal();

  return (
    <div className={styles.container}>
      <Button onClick={() => push(Routes.HOME)}>{t('home')}</Button>
      <Button onClick={handleOpenProfileSettings}>
        {t('profileSettings')}
      </Button>
      <Button onClick={handleSignOut}>{t('logout')}</Button>
      <Suspense fallback={<UserPointsSkeleton />}>
        <UserPoints />
      </Suspense>
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
