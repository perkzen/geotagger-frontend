'use client';
import { useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {useSuspenseQuery} from "@tanstack/react-query";
import EmptyList from '@/components/blocks/empty-list/empty-list';
import Avatar from '@/components/ui/avatar/avatar';
import {
  activityLogsQueryOptions,
  useActionLabel,
  useComponentTypeLabel,
} from '@/lib/api/activity-log/hooks';
import { ActivityLog } from '@/lib/api/activity-log/models';
import { formatDate } from '@/lib/utils/format-date';
import styles from './activity-log-table.module.scss';



export const ActivityLogTable = () => {
  const t = useTranslations('activityLog.table');
  const { data } = useSuspenseQuery(activityLogsQueryOptions( { take: 100, skip: 0 }));
  const { data: activityLogs } = data;

  const getActionLabel = useActionLabel();
  const getComponentTypeLabel = useComponentTypeLabel();

  const renderActivityLog = (activityLog: ActivityLog) => {
    const formattedDate = formatDate(activityLog.createdAt).split(' ');

    return (
      <TableRow key={activityLog.id}>
        <TableCell align="left">
          <span className={styles.user}>
            <Avatar size={'md'} src={activityLog.user.imageUrl as string} />
            <Typography variant="sm">
              {activityLog.user.firstname} {activityLog.user.lastname}
            </Typography>
          </span>
        </TableCell>
        <TableCell>
          <Typography variant="sm" color="textSecondary">
            {formattedDate[0]}
            <br />
            {formattedDate[1]}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="sm" color="textSecondary">
            {getActionLabel(activityLog.action)}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="sm" color="textSecondary">
            {getComponentTypeLabel(activityLog.componentType)}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="sm" color="textSecondary">
            {activityLog.value ? activityLog.value : '/'}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="sm" color="textSecondary">
            {activityLog.location}
          </Typography>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <TableContainer className={styles.container}>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="xs" color="textSecondary">
                {t('user')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="xs" color="textSecondary">
                {t('date')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="xs" color="textSecondary">
                {t('action')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="xs" color="textSecondary">
                {t('componentType')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="xs" color="textSecondary">
                {t('newValue')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="xs" color="textSecondary">
                {t('location')}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activityLogs.length === 0 ? (
            <TableRow className={styles.emptyTable}>
              <TableCell colSpan={6}>
                <EmptyList
                  title={t('notFound')}
                  description={t('notFoundDescription')}
                />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {activityLogs.map((activityLog) =>
                renderActivityLog(activityLog)
              )}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
