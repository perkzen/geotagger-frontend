import { useTranslations } from 'next-intl';
import { queryOptions } from '@tanstack/react-query';
import { getActivityLogs } from '@/lib/api/activity-log/index';
import { Action, Actions, ComponentType } from '@/lib/api/activity-log/models';
import { PaginationQuery } from '@/lib/types/pagination';

export const ACTIVITY_LOGS_KEY = 'ACTIVITY_LOGS';

export const activityLogsQueryOptions = (query: PaginationQuery) =>
  queryOptions({
    queryKey: [ACTIVITY_LOGS_KEY, query],
    queryFn: () => getActivityLogs(query),
  });

export const useActionLabel = () => {
  const t = useTranslations('activityLog.action');

  return (action: Action) => {
    switch (action) {
      case Actions.CLICK:
        return t('click');
      case Actions.SCROLL:
        return t('scroll');
      case Actions.ADDED_VALUE:
        return t('addedValue');
      case Actions.CHANGED_VALUE:
        return t('changedValue');
      case Actions.REMOVED_VALUE:
        return t('removedValue');
      default:
        return '/';
    }
  };
};

export const useComponentTypeLabel = () => {
  const t = useTranslations('activityLog.componentType');

  return (componentType: ComponentType | null) => {
    return componentType ? t(componentType) : '/';
  };
};
