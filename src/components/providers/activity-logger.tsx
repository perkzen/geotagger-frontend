'use client';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Routes } from '@/lib/constants/routes';
import { useClickLogger } from '@/lib/hooks/use-click-logger';
import { useInputChangeLogger } from '@/lib/hooks/use-input-change-logger';
import { useRole } from '@/lib/hooks/use-role';
import { useScrollLogger } from '@/lib/hooks/use-scroll-logger';

export default function ActivityLogger({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isAdmin } = useRole();

  const isEnabled =
    !isAdmin() && pathname !== Routes.SIGN_IN && pathname !== Routes.SIGN_UP;

  const options = { enabled: isEnabled };

  useScrollLogger(options);
  useInputChangeLogger(options);
  useClickLogger(options);

  return children;
}
