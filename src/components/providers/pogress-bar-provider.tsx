'use client';
import { useEffect } from 'react';
import {
  AppProgressBar,
  startProgress,
  stopProgress,
} from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import vars from '@/styles/variables.module.scss';

export default function ProgressBarProvider() {
  const pathname = usePathname();

  /**
   * We use this effect to trigger progress when using useRouter hook
   */
  useEffect(() => {
    startProgress();
    return () => {
      stopProgress();
    };
  }, [pathname]);

  return (
    <AppProgressBar
      height="4px"
      color={vars.primary}
      shallowRouting
      options={{ showSpinner: false }}
    />
  );
}
