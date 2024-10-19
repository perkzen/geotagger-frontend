'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Add } from '@mui/icons-material';
import { Avatar, Button, IconButton, Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { profileQueryOptions } from '@/lib/api/profile/hooks';
import { Routes } from '@/lib/constants/routes';
import { useModalStore } from '@/lib/stores/modal-store';
import { ModalTypes } from '@/lib/types/modal';
import styles from './logged-in-menu.module.scss';

type LoggedInMenuProps = {
  handleSignOut: () => void;
};

const LoggedInMenu: FC<LoggedInMenuProps> = ({ handleSignOut }) => {
  const t = useTranslations('shared');
  const { push } = useRouter();

  const { data: profile } = useSuspenseQuery(profileQueryOptions);
  const imageUrl = profile?.imageUrl ?? undefined;

  const { openModal } = useModalStore();

  const handleOpenProfileSettings = () => {
    openModal({ type: ModalTypes.PROFILE_SETTINGS });
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
