import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ChevronRight } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import classNames from 'classnames';
import ProfileInfo from '@/components/blocks/profile-info/profile-info';
import { Routes } from '@/lib/constants/routes';
import styles from './mobile-logged-in-menu.module.scss';

type MobileLoggedInMenuProps = {
  handleSignOut: () => void;
};

const MobileLoggedInMenu: FC<MobileLoggedInMenuProps> = ({ handleSignOut }) => {
  const t = useTranslations('shared');

  return (
    <>
      <ProfileInfo textVariant={'h5'} href={Routes.PROFILE} />
      <nav className={styles.nav}>
        <Link href={Routes.HOME} className={styles.link}>
          <Typography variant="h5">{t('home')}</Typography>
          <ChevronRight />
        </Link>
        <Link href={Routes.HOME} className={styles.link}>
          <Typography variant="h5">{t('profileSettings')}</Typography>
          <ChevronRight />
        </Link>
        <Button
          onClick={handleSignOut}
          className={classNames(styles.link, styles.logout)}
        >
          <Typography variant="h5">{t('logout')}</Typography>
          <ChevronRight />
        </Button>
      </nav>
    </>
  );
};

export default MobileLoggedInMenu;
