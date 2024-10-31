'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  useActionLabel,
  useComponentTypeLabel,
} from '@/lib/api/activity-log/hooks';
import { ActivityLog } from '@/lib/api/activity-log/models';
import { Pagination } from '@/lib/types/pagination';
import { formatDate } from '@/lib/utils/format-date';
import styles from './activity-log-table.module.scss';

type ActivityLogTableProps = {
  data: Pagination<ActivityLog>;
};

export const ActivityLogTable: FC<ActivityLogTableProps> = ({ data }) => {
  const t = useTranslations('activityLog.table');

  const { data: activityLogs } = data;

  const getActionLabel = useActionLabel();
  const getComponentTypeLabel = useComponentTypeLabel();

  const renderActivityLog = (activityLog: ActivityLog) => {
    const formattedDate = formatDate(activityLog.createdAt).split(' ');

    return (
      <TableRow key={activityLog.id}>
        <TableCell align="left">
          <span className={styles.user}>
            <Image
              src={activityLog.user.imageUrl as string}
              alt={'user'}
              width={40}
              height={40}
            />
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
          {activityLogs.map((activityLog) => renderActivityLog(activityLog))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
