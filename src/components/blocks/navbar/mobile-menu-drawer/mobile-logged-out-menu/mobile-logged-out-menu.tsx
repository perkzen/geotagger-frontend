import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
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

  const handleRouteChange = (route: Route) => {
    push(route);
    closeDrawer();
  };

  return (
    <>
      <nav>
        <Link href={Routes.HOME} className={styles.link}>
          <Typography variant="h5">{t('home')}</Typography>
          <ChevronRight />
        </Link>
      </nav>
      <div className={styles.actions}>
        <Button
          variant="contained"
          onClick={() => handleRouteChange(Routes.SIGN_UP)}
        >
          {t('signUp')}
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleRouteChange(Routes.SIGN_IN)}
        >
          {t('signIn')}
        </Button>
      </div>
    </>
  );
};

export default MobileLoggedOutMenu;
