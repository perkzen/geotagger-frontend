import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Session } from '@/lib/types/session';

export type SessionState = {
  session: Session | null;
  setSession: (session: Session) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionState>()(
  devtools(
    (set) => ({
      session: null,
      setSession: (session) =>
        set(() => ({ session }), false, 'SessionStore/setSession'),
      clearSession: () =>
        set(() => ({ session: null }), false, 'SessionStore/clearSession'),
    }),
    { name: 'SessionStore' }
  )
);
