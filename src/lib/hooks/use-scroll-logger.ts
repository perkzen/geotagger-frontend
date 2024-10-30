import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { createActivityLog } from '@/lib/api/activity-log';
import { Actions } from '@/lib/api/activity-log/models';

type UseScrollLoggerOptions = {
  enabled?: boolean;
};

export const useScrollLogger = (options?: UseScrollLoggerOptions) => {
  const { enabled = true } = options || {};
  const pathname = usePathname();

  const debouncedHandleScroll = useDebouncedCallback(() => {
    void createActivityLog({
      location: pathname,
      action: Actions.SCROLL,
      componentType: null,
      value: null,
    });
  }, 1000);

  useEffect(() => {
    if (enabled) {
      window.addEventListener('scroll', debouncedHandleScroll);
    }

    return () => {
      if (enabled) {
        window.removeEventListener('scroll', debouncedHandleScroll);
      }
    };
  }, [debouncedHandleScroll, enabled]);
};
