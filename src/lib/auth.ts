import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

/**
 * Server-side session check
 */
export async function getServerAuthSession() {
  return await getServerSession();
}

/**
 * Protected page wrapper
 */
export async function requireAuth(requiredRole?: string) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth/signin");
  }

  if (requiredRole && session.user?.role !== requiredRole) {
    redirect("/auth/unauthorized");
  }

  return session;
}

/**
 * Admin authorization check
 */
export async function requireAdmin() {
  return await requireAuth("admin");
}

/**
 * Role hierarchy check
 */
export function hasPermission(userRole: string, requiredRole: string): boolean {
  const roleHierarchy: Record<string, number> = {
    user: 1,
    admin: 2,
  };

  return (roleHierarchy[userRole] || 0) >= (roleHierarchy[requiredRole] || 0);
}
