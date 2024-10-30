import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { createActivityLog } from '@/lib/api/activity-log';
import { Actions, ComponentTypes } from '@/lib/api/activity-log/models';

type UseInputChangeLoggerOptions = {
  enabled?: boolean;
};

export const useInputChangeLogger = (options?: UseInputChangeLoggerOptions) => {
  const { enabled = true } = options || {};

  const pathname = usePathname();
  const previousValues = useRef<{ [key: string]: string }>({});

  const debouncedHandleChange = useDebouncedCallback((event: Event) => {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const newValue = target.value;
    const previousValue = previousValues.current[name] || '';

    const actionType =
        previousValue === '' ? Actions.ADDED_VALUE : Actions.CHANGED_VALUE;

    void createActivityLog({
      location: pathname,
      action: actionType,
      componentType: ComponentTypes.INPUT,
      value: newValue,
    });

    previousValues.current[name] = newValue;
  }, 1000);

  useEffect(() => {
    if (enabled) {
      window.addEventListener('input', debouncedHandleChange);
    }

    return () => {
      if (enabled) {
        window.removeEventListener('input', debouncedHandleChange);
      }
    };
  }, [debouncedHandleChange, enabled]);
};
