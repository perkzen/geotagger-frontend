'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Close, Menu } from '@mui/icons-material';
import { Button, Drawer, Typography } from '@mui/material';
import Logo from 'public/images/logo.svg';
import { Routes } from '@/lib/constants/routes';
import styles from './mobile-menu-drawer.module.scss';

const MobileMenuDrawer = () => {
  const t = useTranslations('shared');
  const [open, setOpen] = useState(false);

  return (
    <>
      <Menu color="primary" onClick={() => setOpen(true)} />
      <Drawer
        className={styles.drawer}
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
        hideBackdrop
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <Image
              src={Logo}
              alt={'logo'}
              quality={100}
              className={styles.logo}
            />
            <Close color="primary" onClick={() => setOpen(false)} />
          </div>
          <nav>
            <Link href={Routes.home} className={styles.link}>
              <Typography variant="h5">{t('home')}</Typography>
              <ChevronRight />
            </Link>
          </nav>
          <div className={styles.actions}>
            <Button variant="contained" href={Routes.signUp}>
              {t('signUp')}
            </Button>
            <Button variant="outlined" href={Routes.signIn}>
              {t('signIn')}
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default MobileMenuDrawer;
