import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import classNames from 'classnames';
import UserInfo from '@/components/blocks/mobile-menu-drawer/user-info/user-info';
import { SESSION_KEY, useSignOut } from '@/lib/api/auth/hooks';
import { GET_PROFILE_KEY } from '@/lib/api/profile/hooks';
import { Routes } from '@/lib/constants/routes';
import { getQueryClient } from '@/lib/utils/get-query-client';
import styles from './mobile-logged-in-menu.module.scss';

const MobileLoggedInMenu = () => {
  const t = useTranslations('shared');
  const queryClient = getQueryClient();
  const { push } = useRouter();

  const { mutateAsync: signOut } = useSignOut({
    onSuccess: () => {
      void Promise.all([
        queryClient.invalidateQueries({
          queryKey: [SESSION_KEY],
        }),
        queryClient.invalidateQueries({ queryKey: [GET_PROFILE_KEY] }),
      ]);

      push(Routes.SIGN_IN);
    },
  });

  const handleSignOut = async () => {
    void signOut();
  };

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
