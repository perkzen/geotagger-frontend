import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ChevronRight } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import classNames from 'classnames';
import UserInfo from '@/components/blocks/mobile-menu-drawer/user-info/user-info';
import { Routes } from '@/lib/constants/routes';
import styles from './mobile-logged-in-menu.module.scss';

type MobileLoggedInMenuProps = {
  handleSignOut: () => void;
};

const MobileLoggedInMenu: FC<MobileLoggedInMenuProps> = ({ handleSignOut }) => {
  const t = useTranslations('shared');

  return (
    <>
      <UserInfo />
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
