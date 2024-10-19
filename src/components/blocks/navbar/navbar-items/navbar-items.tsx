'use client';
import { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMediaQuery, useTheme } from '@mui/material';
import MobileMenuDrawer from '@/components/blocks/mobile-menu-drawer/mobile-menu-drawer';
import LoggedInMenu from '@/components/blocks/navbar/logged-in-menu/logged-in-menu';
import LoggedOutMenu from '@/components/blocks/navbar/logged-out-menu/logged-out-menu';
import { useSignOut } from '@/lib/api/auth/hooks';
import { useSessionStore } from '@/lib/stores/session-store';
import { getQueryClient } from '@/lib/utils/get-query-client';

type NavbarItemsProps = {
  isAuth: boolean;
};

const NavbarItems: FC<NavbarItemsProps> = ({ isAuth }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const queryClient = getQueryClient();
  const { clearSession } = useSessionStore();

  const { refresh } = useRouter();

  const { mutateAsync: signOut } = useSignOut({
    onSuccess: async () => {
      refresh();
      clearSession();
      await queryClient.invalidateQueries();
    },
  });

  /**
   *   Refresh the page when the user signs in or out
   *   to update the navbar items
   */
  useEffect(() => {
    refresh();
  }, [isAuth, refresh]);

  if (isMobile) {
    return <MobileMenuDrawer handleSignOut={signOut} isAuth={isAuth} />;
  }

  return isAuth ? <LoggedInMenu handleSignOut={signOut} /> : <LoggedOutMenu />;
};

export default NavbarItems;
