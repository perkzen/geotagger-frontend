import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import {
  useActionLabel,
  useComponentTypeLabel,
} from '@/lib/api/activity-log/hooks';
import { ActivityLog } from '@/lib/api/activity-log/models';
import { formatDate } from '@/lib/utils/format-date';
import styles from './activity-log-item.module.scss';

type ActivityLogItemProps = {
  item: ActivityLog;
};

const ActivityLogItem: FC<ActivityLogItemProps> = ({ item }) => {
  const t = useTranslations('activityLog.table');
  const getActionLabel = useActionLabel();
  const getComponentTypeLabel = useComponentTypeLabel();

  const formattedDate = formatDate(item.createdAt).split(' ');

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Typography variant="xs" color="textSecondary">
          {t('user')}
        </Typography>
        <Typography variant="sm" fontWeight={500}>
          {item.user.firstname} {item.user.lastname}
        </Typography>
      </div>
      <div className={styles.row}>
        <Typography variant="xs" color="textSecondary">
          {t('date')}
        </Typography>
        <Typography variant="sm" color="textSecondary">
          {formattedDate[0]}
          <br />
          {formattedDate[1]}
        </Typography>
      </div>
      <div className={styles.row}>
        <Typography variant="xs" color="textSecondary">{t('action')}</Typography>
        <Typography variant="sm" color="textSecondary">
          {getActionLabel(item.action)}
        </Typography>
      </div>
      <div className={styles.row}>
        <Typography variant="xs" color="textSecondary">{t('componentType')}</Typography>
        <Typography variant="sm" color="textSecondary">
          {getComponentTypeLabel(item.componentType)}
        </Typography>
      </div>
      <div className={styles.row}>
        <Typography variant="xs" color="textSecondary">{t('newValue')}</Typography>
        <Typography variant="sm" color="textSecondary">
          {item.value ? item.value : '/'}
        </Typography>
      </div>
      <div className={styles.row}>
        <Typography variant="xs" color="textSecondary">{t('location')}</Typography>
        <Typography variant="sm" color="textSecondary">
          {item.location}
        </Typography>
      </div>
    </div>
  );
};

export default ActivityLogItem;
