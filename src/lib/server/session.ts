import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';
import { env } from '@/env';
import { AccessTokens } from '@/lib/api/auth/models';
import {
  cookieOptions,
  expiresAt,
  SESSION_COOKIE_NAME,
} from '@/lib/constants/cookies';
import { NextAuthErrorCodes } from '@/lib/constants/next-auth-error-codes';
import { NextAuthError } from '@/lib/types/next-auth-error';
import { Session } from '@/lib/types/session';

const secret = new TextEncoder().encode(env.JWT_SECRET);

/**
 * Create a new session for next-auth
 * @param payload
 */
export async function createSession(payload: Session) {
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(secret);

  cookies().set(SESSION_COOKIE_NAME, session, cookieOptions);
}

export async function getSession() {
  'use server';

  const cookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, secret);

    return payload as Session;
  } catch (_err) {
    return null;
  }
}

export async function deleteSession() {
  cookies().delete(SESSION_COOKIE_NAME);
}

export async function updateTokens({
  accessToken,
  refreshToken,
}: AccessTokens) {
  const cookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!cookie) return null; // TODO  maybe throw error?

  const { payload } = await jwtVerify<Session>(cookie, secret);

  if (!payload)
    throw new NextAuthError(
      'Session not found',
      NextAuthErrorCodes.SESSION_NOT_FOUND,
      401
    );

  const newPayload: Session = {
    user: {
      ...payload.user,
    },
    accessToken,
    refreshToken,
  };

  await createSession(newPayload);
}

export async function validateSession(token: string | undefined) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as Session;
  } catch (_e) {
    return null;
  }
}
