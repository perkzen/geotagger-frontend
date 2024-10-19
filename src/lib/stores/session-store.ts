import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AccessTokens } from '@/lib/api/auth/models';
import { Session } from '@/lib/types/session';

export type SessionState = {
  session: Session | null;
  setSession: (session: Session) => void;
  updateTokens: (tokens: AccessTokens) => void;
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
      updateTokens: (tokens) =>
        set((state) => {
          if (!state.session) return state;

          return {
            session: {
              ...state.session,
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
            },
          };
        }),
    }),

    { name: 'SessionStore' }
  )
);
