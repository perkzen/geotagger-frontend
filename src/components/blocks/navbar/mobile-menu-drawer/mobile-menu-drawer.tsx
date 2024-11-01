'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Close, Menu } from '@mui/icons-material';
import { Drawer } from '@mui/material';
import Logo from 'public/images/logo.svg';
import MobileLoggedInMenu from '@/components/blocks/navbar/mobile-menu-drawer/mobile-logged-in-menu/mobile-logged-in-menu';
import MobileLoggedOutMenu from '@/components/blocks/navbar/mobile-menu-drawer/mobile-logged-out-menu/mobile-logged-out-menu';
import styles from './mobile-menu-drawer.module.scss';

type MobileMenuDrawerProps = {
  isAuth: boolean;
  handleSignOut: () => void;
};

const MobileMenuDrawer = ({ isAuth,handleSignOut }: MobileMenuDrawerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Menu color="primary" onClick={() => setOpen(true)} />
      <Drawer
        className={styles.drawer}
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
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
          {isAuth ? (
            <MobileLoggedInMenu handleSignOut={handleSignOut} />
          ) : (
            <MobileLoggedOutMenu closeDrawer={() => setOpen(false)} />
          )}
        </div>
      </Drawer>
    </>
  );
};

export default MobileMenuDrawer;
