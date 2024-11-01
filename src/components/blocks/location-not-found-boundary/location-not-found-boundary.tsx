'use client';
import { FC, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button, Typography } from '@mui/material';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Routes } from '@/lib/constants/routes';
import styles from './location-not-found-boundary.module.scss';

type LocationNotFoundProps = {
  children: ReactNode;
};

/**
 * This component is a wrapper for pages that are querying for a location using useSuspenseQuery.
 *
 */
const LocationNotFoundBoundary: FC<LocationNotFoundProps> = ({ children }) => {
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
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default LocationNotFoundBoundary;
