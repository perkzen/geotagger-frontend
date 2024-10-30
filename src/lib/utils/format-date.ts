import { format } from 'date-fns';

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return format(date, 'dd.MM.yyyy HH:mm:ss');
};
