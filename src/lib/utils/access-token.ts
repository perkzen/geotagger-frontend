import { getAccessTokenFromSession } from '@/lib/api/auth';
import { SESSION_COOKIE_NAME } from '@/lib/constants/cookies';
import { useSessionStore } from '@/lib/stores/session-store';

export const getServerAccessToken = async (): Promise<string | undefined> => {
  try {
    const { cookies } = await import('next/headers');
    const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;

    if (sessionCookie) {
      return await getAccessTokenFromSession(sessionCookie);
    }
  } catch (_e) {
    return undefined;
  }
};

export const getClientAccessToken = (): string | undefined => {
  return useSessionStore.getState().session?.accessToken;
};
