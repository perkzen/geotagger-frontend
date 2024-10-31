import { api } from '@/lib/api';
import {
  ActivityLog,
  CreateActivityLogPayload,
} from '@/lib/api/activity-log/models';
import { ApiRoutes } from '@/lib/constants/api-routes';
import {Pagination, PaginationQuery} from '@/lib/types/pagination';

export const createActivityLog = async (
  activityLog: CreateActivityLogPayload
) => {
  await api.post(ApiRoutes.activityLogs.base, activityLog);
};

export const getActivityLogs = async (query: PaginationQuery) => {
  const res = await api.get<Pagination<ActivityLog>>(
    ApiRoutes.activityLogs.list(query)
  );
  return res.data;
};
