import { Roles } from '@/lib/constants/roles';
import { Session } from '@/lib/types/session';

/**
 * Check if the user is an admin on server side. On client side, use the useRole hook.
 * @param session - The user session
 * @returns - True if the user is an admin
 */
export const isAdmin = (session: Session | null): boolean => {
  return session?.user.role === Roles.ADMIN;
};
