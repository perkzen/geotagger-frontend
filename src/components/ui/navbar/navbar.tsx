'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import Logo from 'public/images/logo.svg';
import styles from './navbar.module.scss';
import { Menu } from '@mui/icons-material';

const Navbar = () => {
  const t = useTranslations('shared');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <nav className={styles.container}>
      <Image src={Logo} alt={'logo'} quality={100} className={styles.logo} />

      {isMobile ? (
        <Menu color="primary" />
      ) : (
        <div className={styles.actions}>
          <Link className={styles.bold} href={'/sign-in'}>
            {t('signIn')}
          </Link>
          <Typography variant="body1">{t('or')}</Typography>
          <Button variant="contained">{t('signUp')}</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
