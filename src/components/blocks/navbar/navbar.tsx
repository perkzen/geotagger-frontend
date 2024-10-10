'use client';
import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery, useTheme } from '@mui/material';
import classNames from 'classnames';
import Logo from 'public/images/logo.svg';
import MobileMenuDrawer from '@/components/blocks/mobile-menu-drawer/mobile-menu-drawer';
import LoggedInMenu from '@/components/blocks/navbar/logged-in-menu/logged-in-menu';
import LoggedOutMenu from '@/components/blocks/navbar/logged-out-menu/logged-out-menu';
import { Routes } from '@/lib/constants/routes';
import { useSession } from '@/lib/hooks/auth';
import styles from './navbar.module.scss';

type NavbarProps = {
  className?: string;
  actions?: boolean;
};

const Navbar: FC<NavbarProps> = ({ className, actions = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const session = useSession();

  return (
    <nav className={classNames(styles.container, className)}>
      <Link href={Routes.home}>
        <Image src={Logo} alt={'logo'} quality={100} className={styles.logo} />
      </Link>
      {isMobile ? (
        <MobileMenuDrawer />
      ) : (
        <>
          {actions && (
            <>{session?.session ? <LoggedInMenu /> : <LoggedOutMenu />}</>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;
