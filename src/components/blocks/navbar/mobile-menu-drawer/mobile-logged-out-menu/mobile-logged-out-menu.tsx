import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChevronRight } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { Route, Routes } from '@/lib/constants/routes';
import styles from './mobile-logged-out-menu.module.scss';

type MobileLoggedOutMenuProps = {
  closeDrawer: () => void;
};

const MobileLoggedOutMenu: FC<MobileLoggedOutMenuProps> = ({ closeDrawer }) => {
  const t = useTranslations('shared');
  const { push } = useRouter();

  const navigateTo = (route: Route) => {
    push(route);
    closeDrawer();
  };

  return (
    <nav>
      <Button
        variant="text"
        onClick={() => navigateTo(Routes.HOME)}
        className={styles.link}
      >
        <Typography variant="h5">{t('home')}</Typography>
        <ChevronRight />
      </Button>
      <div className={styles.actions}>
        <Button variant="contained" onClick={() => navigateTo(Routes.SIGN_UP)}>
          {t('signUp')}
        </Button>
        <Button variant="outlined" onClick={() => navigateTo(Routes.SIGN_IN)}>
          {t('signIn')}
        </Button>
      </div>
    </nav>
  );
};

export default MobileLoggedOutMenu;
