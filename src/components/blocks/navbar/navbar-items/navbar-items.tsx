'use client';
import { FC } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import MobileMenuDrawer from '@/components/blocks/mobile-menu-drawer/mobile-menu-drawer';
import LoggedInMenu from '@/components/blocks/navbar/logged-in-menu/logged-in-menu';
import LoggedOutMenu from '@/components/blocks/navbar/logged-out-menu/logged-out-menu';
import { useSession } from '@/lib/api/auth/hooks';

type NavbarItemsProps = {
  actions?: boolean;
};

const NavbarItems: FC<NavbarItemsProps> = ({ actions = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const data = useSession();

  const isAuth = !!data?.session;

  if (isMobile) {
    return <MobileMenuDrawer />;
  }

  if (actions) {
    return isAuth ? <LoggedInMenu /> : <LoggedOutMenu />;
  }

  return null;
};

export default NavbarItems;
