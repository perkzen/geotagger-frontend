import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';
import ActivityLogItem from '@/components/blocks/lists/activity-log-list/activity-log-item/activity-log-item';
import { ActivityLog } from '@/lib/api/activity-log/models';
import { DEFAULT_TAKE } from '@/lib/constants/pagination';
import { useQueryParams } from '@/lib/hooks/use-query-params';
import { Pagination } from '@/lib/types/pagination';
import styles from './activity-log-list.module.scss';

type ActivityLogListProps = {
  data: Pagination<ActivityLog>;
};

const ActivityLogList: FC<ActivityLogListProps> = ({ data }) => {
  const t = useTranslations();
  const { updateQueryParams, urlQuery } = useQueryParams();

  const { data: activityLogs, meta } = data;

  const hasMore = meta.total > meta.take;

  const loadMore = () => {
    updateQueryParams({
      logs: {
        ...urlQuery.logs,
        take: urlQuery.logs.take + DEFAULT_TAKE,
      },
    });
  };

  return (
    <div className={styles.container}>
      <ul>
        {activityLogs.map((activityLog) => (
          <ActivityLogItem key={activityLog.id} item={activityLog} />
        ))}
      </ul>
      <Button variant="outlined" onClick={loadMore} disabled={!hasMore}>
        {t('shared.loadMore')}
      </Button>
    </div>
  );
};

export default ActivityLogList;
