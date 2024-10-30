import { Roles } from '@/lib/constants/roles';
import { useSessionStore } from '@/lib/stores/session-store';

export const useRole = () => {
  const sessions = useSessionStore((state) => state.session);

  const isAdmin = () => {
    return sessions?.user.role === Roles.ADMIN;
  };

  const isUser = () => {
    return sessions?.user.role === Roles.USER;
  };

  return { isAdmin, isUser };
};
