'use client';
import { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMediaQuery, useTheme } from '@mui/material';
import AdminMenu from '@/components/blocks/navbar/admin-menu/admin-menu';
import LoggedInMenu from '@/components/blocks/navbar/logged-in-menu/logged-in-menu';
import LoggedOutMenu from '@/components/blocks/navbar/logged-out-menu/logged-out-menu';
import MobileMenuDrawer from '@/components/blocks/navbar/mobile-menu-drawer/mobile-menu-drawer';
import { useSignOut } from '@/lib/api/auth/hooks';
import { useRole } from '@/lib/hooks/use-role';
import { useSessionStore } from '@/lib/stores/session-store';
import { Session } from '@/lib/types/session';
import { getQueryClient } from '@/lib/utils/get-query-client';

type NavbarItemsProps = {
  session: Session | null;
};

const NavbarItems: FC<NavbarItemsProps> = ({ session }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const isAuth = session !== null;

  const { isAdmin } = useRole();

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

  if (!isAuth) {
    return <LoggedOutMenu />;
  }

  if (isAdmin()) {
    return <AdminMenu handleSignOut={signOut} />;
  }

  return <LoggedInMenu handleSignOut={signOut} />;
};

export default NavbarItems;
