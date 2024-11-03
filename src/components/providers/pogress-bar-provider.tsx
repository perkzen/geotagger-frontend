'use client';

import { AppProgressBar } from 'next-nprogress-bar';
import vars from '@/styles/variables.module.scss';

export default function ProgressBarProvider() {
  return (
    <AppProgressBar
      height="4px"
      color={vars.primary}
      shallowRouting
      options={{ showSpinner: false }}
    />
  );
}
