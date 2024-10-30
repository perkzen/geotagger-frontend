'use client';
import { useTranslations } from 'next-intl';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import ActivityLogList from '@/components/blocks/lists/activity-log-list/activity-log-list';
import { ActivityLogTable } from '@/components/blocks/tables/activity-log-table/activity-log-table';
import { activityLogsQueryOptions } from '@/lib/api/activity-log/hooks';
import { useQueryParams } from '@/lib/hooks/use-query-params';
import styles from './admin-home-page.module.scss';

export default function AdminHomePage() {
  const t = useTranslations();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { urlQuery } = useQueryParams();

  const query = isMobile ? urlQuery.logs : { take: 100, skip: 0 };

  const { data } = useSuspenseQuery(activityLogsQueryOptions(query));

  return (
    <div className={styles.container}>
      <Typography variant="h4" color="primary">
        {t('activityLog.title')}
      </Typography>
      {isMobile ? (
        <ActivityLogList data={data} />
      ) : (
        <ActivityLogTable data={data} />
      )}
    </div>
  );
}
