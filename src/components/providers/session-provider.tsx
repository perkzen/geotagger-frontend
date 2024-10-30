'use client';
import { ReactNode, useEffect } from 'react';
import { useSessionStore } from '@/lib/stores/session-store';
import { Session } from '@/lib/types/session';

type SessionProviderProps = {
  session: Session | null;
  children: ReactNode;
};

export default function SessionProvider({
  children,
  session,
}: SessionProviderProps) {
  const { setSession } = useSessionStore();

  useEffect(() => {
    if (session) {
      setSession(session);
    }
  }, [session, setSession]);

  return children;
}
