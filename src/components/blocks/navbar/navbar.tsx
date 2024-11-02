'use client';
import { FC, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery, useTheme } from '@mui/material';
import classNames from 'classnames';
import DesktopLogo from 'public/images/logo.svg';
import MobileLogo from 'public/images/mobile-logo.svg';
import { Routes } from '@/lib/constants/routes';
import { useSessionStore } from '@/lib/stores/session-store';
import styles from './navbar.module.scss';

type NavbarProps = {
  className?: string;
  items?: ReactNode;
};

const Navbar: FC<NavbarProps> = ({ className, items }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const session = useSessionStore((state) => state.session);
  const isAuth = session !== null;

  return (
    <nav className={classNames(styles.container, className)}>
      <Link href={Routes.HOME}>
        <Image
          src={isAuth && isMobile ? MobileLogo : DesktopLogo}
          alt={'logo'}
          quality={100}
        />
      </Link>
      {items}
    </nav>
  );
};

export default Navbar;
