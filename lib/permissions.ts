// lib/permissions.ts
export const roleHierarchy = {
  DEV: 3,
  ADMIN: 2,
  USER: 1,
} as const;

export type Role = keyof typeof roleHierarchy;

export function canDelete(currentRole: Role, targetRole: Role) {
  return roleHierarchy[currentRole] > roleHierarchy[targetRole];
}
