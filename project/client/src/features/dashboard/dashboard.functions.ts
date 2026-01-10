const roleHierarchy = {
  student: 0,
  professor: 1,
  admin: 2,
};

export function canAccessRole(userRole: string, requiredRole: string): boolean {
  const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] ?? -1;
  const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] ?? 999;
  return userLevel >= requiredLevel;
}
