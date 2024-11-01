import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import EmptyList from '@/components/blocks/empty-list/empty-list';
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

  const virtualizer = useWindowVirtualizer({
    count: activityLogs.length,
    estimateSize: () => 236, // item height
    overscan: 5,
  });

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
      {activityLogs.length === 0 ? (
        <EmptyList
          title={t('activityLog.table.notFound')}
          description={t('activityLog.table.notFoundDescription')}
          className={styles.emptyList}
        />
      ) : (
        <>
          <ul
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => (
              <li
                key={virtualItem.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <ActivityLogItem item={activityLogs[virtualItem.index]} />
              </li>
            ))}
          </ul>
          <Button variant="outlined" onClick={loadMore} disabled={!hasMore}>
            {t('shared.loadMore')}
          </Button>
        </>
      )}
    </div>
  );
};

export default ActivityLogList;
