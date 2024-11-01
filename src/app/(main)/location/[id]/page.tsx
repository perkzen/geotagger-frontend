'use client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button, Typography } from '@mui/material';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import LocationPage from '@/components/containers/location/location-page';
import LocationPageSkeleton from '@/components/containers/location/location-page-skeleton';
import { Routes } from '@/lib/constants/routes';
import styles from './page.module.scss';

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const t = useTranslations();
  const { push } = useRouter();

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallback={undefined}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className={styles.container}>
              <div className={styles.text}>
                <Typography variant={'h5'}>
                  {t('location.guess.locationNotFound')}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {t('location.guess.locationNotFountDescription')}
                </Typography>
              </div>
              <div className={styles.row}>
                <Button variant="outlined" onClick={() => push(Routes.HOME)}>
                  {t('shared.back')}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => resetErrorBoundary()}
                >
                  {t('shared.tryAgain')}
                </Button>
              </div>
            </div>
          )}
        >
          <Suspense fallback={<LocationPageSkeleton />}>
            <LocationPage id={id} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
