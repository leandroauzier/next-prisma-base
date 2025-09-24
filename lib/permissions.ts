// lib/permissions.ts
export const roleHierarchy = {
  DESENVOLVEDOR: 3,
  ADMINISTRADOR: 2,
  USUARIO: 1,
} as const;

export type Perfil = keyof typeof roleHierarchy;

export function canDelete(currentRole: Perfil, targetRole: Perfil) {
  return roleHierarchy[currentRole] > roleHierarchy[targetRole];
}
