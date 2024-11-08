'use client';
import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import {
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ActivityLogList from '@/components/blocks/lists/activity-log-list/activity-log-list';
import { ActivityLogTable } from '@/components/blocks/tables/activity-log-table/activity-log-table';
import styles from './admin-home-page.module.scss';

export default function AdminHomePage() {
  const t = useTranslations();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className={styles.container}>
      <Typography variant="h4" color="primary">
        {t('activityLog.title')}
      </Typography>
      <Suspense
        fallback={
          <div className={styles.spinner}>
            <CircularProgress color="primary" />
          </div>
        }
      >
        {isMobile ? <ActivityLogList /> : <ActivityLogTable />}
      </Suspense>
    </div>
  );
}
