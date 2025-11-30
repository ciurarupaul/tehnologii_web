import type { AppUser } from '@/types/userTypes';

// safe for parsing longer (>2) names
export function splitName(fullName?: string): { first: string, last: string } {
  if (!fullName)
    return { first: '', last: '' };
  const parts = fullName.trim().split(/\s+/);
  return {
    first: parts.shift() ?? '',
    last: parts.pop() ?? '',
  };
}

export function modelResponseUser(user: AppUser) {
  return {
    id: user.id.toString(),
    betterAuthId: user.betterAuthId.toString(),
    firstName: user.firstName ?? '',
    role: user.role ?? '',
  };
}
