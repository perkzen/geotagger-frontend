import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChevronRight } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import classNames from 'classnames';
import ProfileInfo from '@/components/blocks/profile-info/profile-info';
import { Route, Routes } from '@/lib/constants/routes';
import { useProfileSettingsModal } from '@/lib/hooks/use-profile-settings-modal';
import styles from './mobile-logged-in-menu.module.scss';

type MobileLoggedInMenuProps = {
  signOut: () => void;
  closeDrawer: () => void;
};

const MobileLoggedInMenu: FC<MobileLoggedInMenuProps> = ({
  signOut,
  closeDrawer,
}) => {
  const { push } = useRouter();
  const t = useTranslations('shared');
  const openProfileSettings = useProfileSettingsModal();


  const navigateTo = (route: Route) => {
    push(route);
    closeDrawer();
  };

  const handleOpenProfileSettings = () => {
    openProfileSettings();
    closeDrawer();
  };

  const handleSignOut = () => {
    signOut();
    closeDrawer();
  };

  return (
    <>
    <ProfileInfo textVariant={'h5'} href={Routes.PROFILE}  onClick={closeDrawer}/>
      <nav className={styles.nav}>
        <Button
          variant="text"
          onClick={() => navigateTo(Routes.HOME)}
          className={styles.link}
        >
          <Typography variant="h5">{t('home')}</Typography>
          <ChevronRight />
        </Button>
        <Button
          variant="text"
          onClick={handleOpenProfileSettings}
          className={styles.link}
        >
          <Typography variant="h5">{t('profileSettings')}</Typography>
          <ChevronRight />
        </Button>
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
