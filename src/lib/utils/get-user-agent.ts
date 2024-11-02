import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

export const getUserAgent = () => {
  const headersList = headers();
  const referer = headersList.get('user-agent');
  return UAParser(referer?.toString()).device.type || 'desktop';
};
