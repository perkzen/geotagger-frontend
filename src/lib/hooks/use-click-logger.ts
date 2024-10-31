import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { createActivityLog } from '@/lib/api/activity-log';
import { Actions, ComponentTypes } from '@/lib/api/activity-log/models';

type UseClickLoggerOptions = {
  enabled?: boolean;
};

export const useClickLogger = (options?: UseClickLoggerOptions) => {
  const { enabled = true } = options || {};
  const pathname = usePathname();

  const debouncedHandleClick = useDebouncedCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'button') {
      void createActivityLog({
        location: pathname,
        action: Actions.CLICK,
        componentType: ComponentTypes.BUTTON,
        value: null,
      });
    }
  }, 1000);

  useEffect(() => {
    if (enabled) {
      window.addEventListener('click', debouncedHandleClick);
    }

    return () => {
      if (enabled) {
        window.removeEventListener('click', debouncedHandleClick);
      }
    };
  }, [debouncedHandleClick, enabled, pathname]);
};
