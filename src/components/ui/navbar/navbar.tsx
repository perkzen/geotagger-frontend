'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Routes } from '@/contants/routes';
import MobileMenuDrawer from '@/components/blocks/mobile-menu-drawer/mobile-menu-drawer';
import Logo from 'public/images/logo.svg';
import styles from './navbar.module.scss';

const Navbar = () => {
  const t = useTranslations('shared');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <nav className={styles.container}>
      <Image src={Logo} alt={'logo'} quality={100} className={styles.logo} />

      {isMobile ? (
        <MobileMenuDrawer />
      ) : (
        <div className={styles.actions}>
          <Link className={styles.bold} href={Routes.signIn}>
            {t('signIn')}
          </Link>
          <Typography variant="body1">{t('or')}</Typography>
          <Button variant="contained" href={Routes.signUp}>
            {t('signUp')}
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
